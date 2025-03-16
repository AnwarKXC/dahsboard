<script setup lang="ts">
const { localeProperties } = useI18n()

</script>

<template>
	<Html :lang=" localeProperties.code " :dir=" localeProperties.direction ">

	<Body class="dark:bg-[#1E2832]  dark:text-[#fefce8dc]">
		<NuxtLoadingIndicator color="#FEFCE8" />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</Body>

	</Html>
</template>
