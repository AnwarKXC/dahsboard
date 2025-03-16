<script setup lang="ts">


const route = useRoute()
const { locale } = useI18n()

const breadcrumbs = computed( () => {
	// Get the current path and remove leading/trailing slashes
	let pathSegments = route.path.replace( /^\/+|\/+$/g, '' ).split( '/' )

	// If empty or only contains locale, return empty array
	if ( pathSegments.length === 0 || ( pathSegments.length === 1 && pathSegments[ 0 ] === locale.value ) ) return []

	// Extract and remove locale prefix if it matches
	const localePrefix = pathSegments[ 0 ] === locale.value ? pathSegments.shift() : ''

	return pathSegments.map( ( segment, index ) => {
		return {
			name: segment.replace( /-/g, ' ' ), // Convert hyphens to spaces for readability
			path: `/${ localePrefix }/${ pathSegments.slice( 0, index + 1 ).join( '/' ) }`,
		}
	} )
} )
</script>

<template>
	<nav aria-label="breadcrumb">
		<ul class="flex gap-2 text-nowrap flex-wrap text-xs md:text-sm lg:text-base">
			<li>
				<NuxtLink :to=" `/${ locale }` " class="hover:underline underline-offset-2 opacity-75">
					Home
				</NuxtLink>
			</li>
			<li v-for=" ( breadcrumb, index ) in breadcrumbs " :key=" breadcrumb.path "
				class="flex items-center gap-3">
				<Icon name="material-symbols-light:double-arrow-rounded" class="rtl:rotate-180" />
				<NuxtLink :to=" breadcrumb.path "
					class="underline-offset-2 hover:underline capitalize opacity-75"
					:class=" { 'text-gold font-semibold ': index === breadcrumbs.length - 1 } ">
					{{ breadcrumb.name }}
				</NuxtLink>
			</li>
		</ul>
	</nav>
</template>
