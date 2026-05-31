import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <h1>Register</h1>

      <form>
        <input
          type="text"
          placeholder="Name"
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
        />

        <br />
        <br />

        <button>Register</button>
      </form>

      <p>
        Already have an account?
        <Link to="/">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;