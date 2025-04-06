import React, { useContext } from "react";
import StoreContext from "../../Contexts/Store.jsx";
import "./Appointment.css";

function Appointment({ fetchAppointments }) {
  const { appoint, errMsg, url, successMsg } = useContext(StoreContext);
  const changeStatus = async (event, _id) => {
    try {
      let notactive = event.target.value === "Cancelled By Shop" ? true : false;
      const response = await fetch(url + "/shop/status", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: event.target.value, _id, notactive }),
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return errMsg("Updation failed!");
      }
      fetchAppointments();
      successMsg("Status Updated successfully!");
    } catch (err) {
      console.log(err);
      return errMsg("Unable to update the appointment Status!");
    }
  };

  return (
      <div className="appointment">
        <h1>Appointments </h1>

        <div className="appointment-container">
          {appoint.length != 0 && (
            <div className="row-bold row">
              <p>Name</p>
              <p>mobile</p>
              <p>Date</p>
              <p>Time</p>
              <p>Remark</p>
              <p>Current Status</p>
              <p>Change Status</p>
            </div>
          )}
          {appoint.length === 0 && <p>No Appointments Yet !</p>}
          {appoint.length != 0 &&
            appoint.map((appointment) => {
              return (
                <div className="row" key={appointment._id}>
                  <p className="row-name">{appointment.fullname}</p>
                  <p>{appointment.mobile}</p>
                  <p>{appointment.appointmentDateTime.substr(0, 10)}</p>
                  <p>{appointment.appointmentDateTime.substr(11, 5)}</p>
                  <p> {appointment.remark}</p>
                  <p>{appointment.status}</p>
                  {!appointment.notactive && (
                    <select
                      name="status"
                      onChange={(e) => {
                        changeStatus(e, appointment._id);
                      }}
                      className="status"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Granted">Granted</option>
                      <option value="Cancelled By Shop">
                        Cancelled By Shop
                      </option>
                      <option value="Rescheduled">Rescheduled</option>
                    </select>
                  )}
                </div>
              );
            })}
        </div>

      </div>
  );
}

export default Appointment;
