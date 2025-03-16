import Vue3Toastify, { toast, type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vue3Toastify, {
		autoClose: 1500,
		theme: "colored",
		position: "bottom-right",
		clearOnUrlChange: false,
	} as ToastContainerOptions);

	return {
		provide: {
			toast,
		},
	};
});
