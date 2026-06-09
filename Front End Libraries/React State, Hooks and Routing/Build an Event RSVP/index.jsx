const { useState } = React;

export function EventRSVPForm() {
  const [formData, setFormData] = useState({
    ["first-name"]: "",
    ["last-name"]: "",
    email: "",
    attendees: "",
    dietary: "",
    checkbox: false,
  });

  const handleChange = e => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsFormSubmitted(true);
    console.log("submit");
  };

  return (
    <div id="main-div">
      <h2>Event RSVP</h2>
      <form
        onSubmit={handleSubmit}
        id="isFormSubmitted"
        value={isFormSubmitted}>
        <label htmlFor="first-name">First Name</label>
        <input
          value={formData["first-name"]}
          type="text"
          id="first-name"
          required
          onChange={handleChange}
        />
        <label htmlFor="last-name">Last Name</label>
        <input
          value={formData["last-name"]}
          type="text"
          id="last-name"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          value={formData.email}
          type="email"
          id="email"
          required
          onChange={handleChange}
        />
        <label htmlFor="attendees">Attendees</label>
        <input
          value={formData.attendees}
          type="number"
          id="attendees"
          min="1"
          required
          onChange={handleChange}
        />
        <label htmlFor="dietary">Dietary Preferences</label>
        <textarea
          value={formData.dietary}
          id="dietary"
          onChange={handleChange}></textarea>
        <fieldset>
          <label htmlFor="checkbox" className="checkbox-label">
            Additional Guest
          </label>
          <input
            checked={formData.checkbox}
            type="checkbox"
            id="checkbox"
            name="checkbox"
            onChange={handleChange}
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      {isFormSubmitted && (
        <>
          <p>RSVP Submitted!</p>
          <p>
            Name: {formData["first-name"]} {formData["last-name"]}
          </p>
          <p>Email: {formData.email}</p>
          <p>Number of attendees: {formData.attendees}</p>
          <p>
            Dietary preferences:{" "}
            {formData.dietary.trim() !== "" ? formData.dietary : "none"}
          </p>
          <p>Bringing additional guests: {formData.checkbox ? "yes" : "no"}</p>
        </>
      )}
    </div>
  );
}
