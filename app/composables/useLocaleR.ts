export default (route: string) => {
	const localeRoute = useLocaleRoute();
	return localeRoute(route);
};
