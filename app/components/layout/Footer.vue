<script setup lang="ts">
const currentYear = ref( new Date().getFullYear() )

</script>

<template>
	<footer class="dark:bg-gray-300/5 bg-gray-600/10 ">
		<div class="container">
			<div class="grid md:grid-cols-4 gap-8 py-10">
				<div class="md:col-span-2 place-content-center">
					<div class="w-64 max-md:mx-auto">
						<Logo />
					</div>
				</div>
				<div class="grid gap-6 place-content-center" v-for=" i in 2 ">
					<nuxt-link v-for=" i in 3 " :to=" useLocaleR( '/terms-and-conditions' ) "
						class="hover:text-primary font-semibold transition-all">
						{{ $t( "terms&Conditions" ) }}
					</nuxt-link>
				</div>
			</div>
			<hr class="opacity-10" />
			<div
				class="text-center flex flex-wrap gap-8 gap-y-4 items-center justify-around md:justify-between py-5">
				<div class="">
					<p>
						{{ $t( "nav.copyright" ) }} &nbsp;{{ currentYear }}&nbsp;{{
							$t( "nav.rightsReserved" )
						}}
					</p>
					<p class="font-serif pt-1">
						{{ $t( "developed" ) }} &nbsp;
						<BaseTooltip>
							<template #trigger>
								<!-- Pop up trigger content -->
								<button @click=" showModal "
									class="text-gold underline underline-offset-8 bg-transparent border-none cursor-pointer p-0">
									{{ $t( "AnwarKamal" ) }}
								</button>
							</template>
							<template #body>
								<div  class="whitespace-nowrap">
									{{ $t( "nav.contact" ) }}
								</div>
							</template>
						</BaseTooltip>
					</p>
				</div>
				<div class="flex gap-6">
					<nuxt-link :to=" useLocaleR( '/terms-and-conditions' ) "
						class="hover:text-primary font-semibold transition-all">
						{{ $t( "termsConditions" ) }}
					</nuxt-link>
				</div>
			</div>
		</div>
	</footer>

</template>

<style scoped></style>
