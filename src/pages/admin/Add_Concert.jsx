import React, { useState } from 'react';
import { createConcert, uploadPoster } from '../../api/Concert';
import { createTicket } from '../../api/ticket';
import useWebStore from '../../store/web-store';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer'
import Uploadfile from './Uploadfile';


const Add_Concert= () => {
  const token = useWebStore((state) => state.token);
  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    time: "",
    priceStart: "",
    images:[]
  });

  const [formTickets, setFormTickets] = useState([
    { title: "", price: "", quantity: "" }, // Initial ticket form
    { title: "", price: "", quantity: "" }, // Another ticket form
  ]);

  // Handle change for concert form
  const handleConcertChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle change for ticket form
  const handleTicketChange = (index, e) => {
    const updatedTickets = [...formTickets];
    updatedTickets[index][e.target.name] = e.target.value;
    setFormTickets(updatedTickets);
  };
  
  // Handle submit for concert and ticket creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.location || !form.time || !form.priceStart) {
      return toast.warning('Please fill concert data');
    }

    try {
      // Create concert first
      const concertRes = await createConcert(token, form);
      const concertId = concertRes.data.id; // Assume the API returns concertId in data.id
      toast.success(`Concert "${concertRes.data.name}" created successfully!`);

      // Then create tickets using concertId
      for (const ticket of formTickets) {
        if (!ticket.title || !ticket.price || !ticket.quantity) {
          return toast.warning('Please fill all ticket data');
        }
        const ticketData = { ...ticket, concertId }; // Add concertId to ticket data
        await createTicket(token, ticketData);
      }
      console.log(form)
      toast.success(`Tickets added successfully!`);
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full font-fcfriday">
      <div className="h-screen bg-gray-300 p-6">
        <h1 className="text-2xl mb-5">{'<'} ย้อนกลับ</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg h-[85vh] overflow-y-auto">
          <div className="flex mb-4">
            {/* Left side: Concert Form */}
            <div className="w-1/2 pr-4">
            <Uploadfile form={form} setForm={setForm} />
            </div>

            {/* Right side: Ticket Form */}
            <div className="w-1/2 pl-4">
            <h2 className="text-lg mb-2">Concert Information</h2>
              <input
                type="text"
                name="name"
                placeholder="Concert Name"
                className="w-full border rounded p-2 mb-4"
                onChange={handleConcertChange}
              />
              <input
                type="date"
                name="date"
                className="w-full border rounded p-2 mb-4"
                onChange={handleConcertChange}
              />
              <input
                type="time"
                name="time"
                className="w-full border rounded p-2 mb-4"
                onChange={handleConcertChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full border rounded p-2 mb-4"
                onChange={handleConcertChange}
              />
              <input
                type="text"
                name="priceStart"
                placeholder="Starting Price"
                className="w-full border rounded p-2 mb-4"
                onChange={handleConcertChange}
              />
              <h2 className="text-lg mb-2">Ticket Information</h2>
              <div className="grid grid-cols-3 ">
                <h2>ประเภทบัตร</h2>
                <h2>ราคาบัตร</h2>
                <h2>จำนวนบัตร</h2>
              </div>
                {formTickets.map((ticket, index) => (
                <div key={index} className="grid grid-cols-3 mb-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Ticket Type"
                    className="w-full border rounded p-2"
                    value={ticket.title}
                    onChange={(e) => handleTicketChange(index, e)}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Ticket Price"
                    className="w-full border rounded p-2"
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, e)}
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Ticket Quantity"
                    className="w-full border rounded p-2"
                    value={ticket.quantity}
                    onChange={(e) => handleTicketChange(index, e)}
                  />
                </div>
              ))}
              
            </div>
          </div>

          <button type="submit" className="w-full text-xl px-4 py-2 text-white bg-blue-500 rounded mt-5">Create Concert and Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default Add_Concert;
