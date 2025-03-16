<script setup lang="ts">
const modalActive = ref( false )
const toggleModal = () => {
	modalActive.value = !modalActive.value
}

</script>
<template>
	<header class="relative dark:bg-primary"
		:class=" { 'bg-gray-600/10': useLocaleN() === 'index' } ">
		<div class="py-3 md:grid grid-cols-3 flex justify-between gap-8 container items-center">
			<div class="gap-8 flex items-center max-md:hidden">
				<ModeSwitcher />
				<LangSwitcher />
			</div>
			<div class="max-md:w-fit">
				<Logo />
			</div>
			
			<div class="flex items-center justify-end gap-3 md:gap-8 shrink-0">
				<button @click=" toggleModal " class="md:hidden ltr:rotate-180">
					<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2"
							stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
			</div>
		</div>
		<div class="container h-[0px] border border-gray-400 dark:border-gold opacity-50"></div>

		<div class="max-md:hidden">
			<NavLinks />
		</div>
	</header>

	<LazyMobileHeaderToggle :modalActive=" modalActive " @close-modal=" toggleModal " />

</template>

<style scoped></style>
