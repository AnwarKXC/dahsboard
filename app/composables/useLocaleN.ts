export default () => {
	const route = useRoute();
	const getRouteBaseName = useRouteBaseName();
	const baseRouteName = computed(() => {
		return getRouteBaseName(route);
	});
	return baseRouteName.value;
};
