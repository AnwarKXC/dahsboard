export default defineNuxtRouteMiddleware( async ( to ) => {
	const { currentUser } = userStore()

	// Redirect if the user is not logged in
	if ( !currentUser ) {
		return navigateTo( useLocaleR( "/dashboard/login" ) )
	}

	//  allowed roles
	const allowedRoles = [ "Admin", "Owner" ,"Employee" ]

	// Redirect if the route requires an admin and the user does not have the required role
	if ( to.meta.requiresAdmin && !allowedRoles.includes( currentUser.role ) ) {
		return navigateTo( useLocaleR( "/dashboard/login" ) )
	}
} )
