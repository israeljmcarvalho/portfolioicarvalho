import { withAuth } from "next-auth/middleware"

export default withAuth(
	function middleware (req) {
	},
	{
		callbacks: {
			authorized: ({req,	token }) => {
				if (
					token === null
				) {
					return false
				}
				return true
			}
		}
	}
)

export const config = {
	matcher: '/api/rrunner/:path*',
}