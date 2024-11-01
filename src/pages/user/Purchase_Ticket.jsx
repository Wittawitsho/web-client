import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import useWebStore from '../../store/web-store';
import { listTicket } from '../../api/ticket';
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify'

const Purchase_Ticket = () => {
  const { id } = useParams(); 
  const token = useWebStore((state) => state.token);
  const actionAddtoCart = useWebStore((state) => state.actionAddtoCart);
  const actionRemoveProduct = useWebStore((state) => state.actionRemoveProduct);
  const getTotalPrice = useWebStore((state) => state.getTotalPrice);
  const [tickets, setTickets] = useState([]); 
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await listTicket(id); 
        console.log('Tickets Data:', response.data); 
        setTickets(response.data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };

    if (id && token) {
      fetchTickets();
    }
  }, [id, token]);

  const cart = useWebStore((state)=>state.carts)
  const actionUpdateQuantity = useWebStore((state)=>state.actionUpdateQuantity)
  console.log(cart)
  
  const handleSaveCart  = async()=>{
    await createUserCart(token,{cart})
    .then((res)=>{
      console.log(res)
      toast.success("บันทึกใส่ตะกร้าเรียบร้อยแล้วจ้า",{
        position:"top-center"
      });
      navigate('/user/payment')
    })
    .catch((err)=>{
      console.log("err", err);
      toast.warning(err.response.data.message)
    })
}

  return (
    <div>
      <div className="mt-14 ml-32 mr-32">
        <h1 className="font-fcfriday text-2xl mb-5">ประเภทบัตร</h1>
        <div className="flex space-x-5">
          {/* Left side - Ticket Types */}
          <div className="w-1/2 flex flex-col space-y-5">
            {tickets.length > 0 ? (
              <ul>
                {tickets.map((ticket) => (
                  <li key={ticket.id} className="flex justify-between mb-2">
                    <div 
                    onClick={()=>actionAddtoCart(ticket)}
                    className=" w-full h-28 bg-gray-200 p-5 rounded-lg flex justify-between items-center">
                      <div>
                        <h2 className="font-fcfriday text-2xl mb-1">{ticket.title}</h2>
                        <p className="font-fcfriday text-xl">{ticket.price}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>ไม่มีบัตรที่ขายได้</p> // No tickets available
            )}
          </div>
          
          {/* Right side - Summary */}
          <div className="w-1/2">
            <div className="bg-gray-200 p-5 rounded-lg h-full flex flex-col">
              <h2 className="flex justify-center font-fcfriday text-xl mb-3">สรุปรายการสั่งซื้อ</h2>
              <hr className="border-gray-400 border-2 mb-3" />
            {
            cart.map((item,index)=>
              <div key={index} className="flex justify-between font-fcfriday">
                <div>
            <p>{item.title}</p>
            <div className='flex'>
                        <div className='border rounded-sm  py-1 flex items-center'>
                          <button 
                          onClick={()=>actionUpdateQuantity(item.id,item.count - 1)}
                          className='px-2 py-1 bg-blue-200 rounded-sm'>-</button>
                          <span className='px-4 '>{item.count}</span>
                          <button
                          onClick={()=>actionUpdateQuantity(item.id,item.count + 1)} 
                          className='px-2 py-1 bg-blue-200 rounded-sm'>+</button>
                          <img src="https://res.cloudinary.com/dtszdlqut/image/upload/v1730384535/Web/m4lyi0mrtzvgfnyt7m0g.png" 
                          alt="bin" className="w-7 h-7 ml-5" 
                          onClick={()=>actionRemoveProduct(item.id)}
                          />
                        </div>
                      </div>
                      </div>
            <p>{item.price}</p>
            
          </div>
      )
  }

              {/* Footer with total and payment button */}
              <div className="mt-auto">
                <hr className="border-gray-400 border-2 mb-3" />
                <div className="flex justify-between font-fcfriday">
                  <p>จำนวน : </p>
                  <p>{getTotalPrice()}</p>
                </div>
                
                <button 
                onClick={handleSaveCart}
                className="bg-blue-500 text-white font-fcfriday text-lg mt-5 py-2 px-4 rounded-lg w-full">
                  ชำระเงิน
                </button>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase_Ticket;
