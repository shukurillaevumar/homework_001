import { useEffect, useState } from "react";

const LocalStorageApp = () => {
  const [name, setName] = useState([]);
  const [job, setJob] = useState([]);
  const [birthDate, setBirthDate] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("users")) {
      setUsers(JSON.parse(localStorage.getItem("users")));
    } else {
      setUsers([]);
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);

  function handleChange(e) {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "job") {
      setJob(e.target.value);
    }
    if (e.target.name === "birthDate") {
      setBirthDate(e.target.value);
    }
  }

  function handleAdd() {
    const newUser = {
      name,
      job,
      birthDate,
    };

    setUsers((prev) => [...prev, newUser]);
    const db = JSON.parse(localStorage.getItem('users'));
    db.push(newUser);
    localStorage.setItem('users', JSON.stringify(db));
  }

  function handleRemove (id) {
    const updDB = users.filter((user, index) => id !== index);
    setUsers(updDB);
    localStorage.setItem('users', JSON.stringify(updDB));
}

  return (
    <div className="main">
      <h1>ToDo App by using Local Storage</h1>
      <div className="container">
        <div className="left">
          <form onSubmit={handleAdd}>
            <div className="formGroup">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name..."
                onChange={(e) => handleChange(e)}
                pattern="[A-Za-z]+"
                required
              />
            </div>
            <div className="formGroup">
              <input
                type="text"
                id="job"
                name="job"
                placeholder="Job..."
                onChange={(e) => handleChange(e)}
                pattern="[A-Za-z]+"
                required
              />
            </div>
            <div className="formGroup">
              <input
                type="date"
                id="DOB"
                name="birthDate"
                placeholder="Date of Birth..."
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="right">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Birth Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.job}</td>
                  <td>{user.birthDate}</td>
                  <td><button onClick={() => handleRemove(index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocalStorageApp;
