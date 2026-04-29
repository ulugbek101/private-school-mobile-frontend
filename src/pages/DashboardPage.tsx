import useAuthContext from "../hooks/useAuthContext";

function DashboardPage() {
	const { logoutUser } = useAuthContext();

	return (
		<div>
			<h1>Dashboard page</h1>
			<p onClick={logoutUser}>Logout</p>
		</div>
	);
}

export default DashboardPage;
