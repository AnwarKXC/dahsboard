export default defineNuxtRouteMiddleware(async (to) => {
  const currentUser = useCookie('currentUser') as { value: IUser | null }

  // Allow access to the "/auth" path for unauthorized users
  if (to.path.includes('/auth')) {
    return // No redirection needed for the "/auth" path
  }

  // Redirect unauthorized users to "/auth"
  if (!currentUser.value) {
    return navigateTo(useLocaleR('/auth'))
  }

  // Define allowed roles
  const allowedRoles = ['Admin', 'Employee']

  // Redirect if the route requires an admin and the user does not have the required role
  if (to.meta.requiresAdmin && !allowedRoles.includes(currentUser.value.role)) {
    return navigateTo(useLocaleR('/need-admin'))
  }
})
