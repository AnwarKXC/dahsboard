import fs from 'node:fs'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { defineEventHandler } from 'h3'
import mime from 'mime-types'
import multiparty from 'multiparty'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  // if (!event.context.currentUser) {
  //   throw createError({ statusCode: 401, message: 'Unauthorized' })
  // }

  const form = new multiparty.Form()
  const { files } = await new Promise<{ fields: any, files: any }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err)
        reject(err)
      resolve({ fields, files })
    })
  })

  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: runtimeConfig.s3AccessKey,
      secretAccessKey: runtimeConfig.s3SecretAccessKey,
    },
  })

  const links = []
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop()
    const newFilename = `${Date.now()}.${ext}`
    await client.send(
      new PutObjectCommand({
        Bucket: runtimeConfig.s3Bucket,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: 'public-read',
        ContentType: mime.lookup(file.path) || 'application/octet-stream',
      }),
    )
    const link = `https://${runtimeConfig.s3Bucket}.s3.amazonaws.com/${newFilename}`
    links.push(link)
  }

  return { links }
})
