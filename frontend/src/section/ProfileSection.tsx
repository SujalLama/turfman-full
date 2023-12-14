"use client";

import FaIcons from "@/components/FaIcons";
import Input from "@/components/forms/Input";
import { UserActions, UserContext, UserTypes, localStoreUserKey } from "@/providers/AuthProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, FormEvent, ReactNode, SetStateAction, useContext, useEffect, useLayoutEffect, useState } from "react";

import Button from "@/components/forms/Button";
import Portal from "@/components/Portal";
import FileInput from "@/components/forms/File";
import { API_URL } from "@/api/constants";
import Loader from "@/components/Loader";
import Select from "@/components/forms/Select";
import { CartType } from "@/providers/CartProvider";
import Pagination from "@/components/Pagination";
import { BillInfo } from "@/app/(defaultPage)/payment-confirmation/page";
import QueryProvider from "@/providers/QueryProvider";
import { QueryCache, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Logoloader from "@/components/LogoLoader";

type ContactType = {
    username?: string; 
    email?: string; 
    phone?: string; 
    profileImg?: {src: string; alt: string;}, 
    state?: string, 
    postalCode?: string;
    city?: string;
    address?: string;
}

const selectData = [
    {value:"",name: "Select an option…"},
    {value:"ACT",name: "Australian Capital Territory"},
    {value:"NSW",name: "New South Wales"},
    {value:"NT",name: "Northern Territory"},
    {value:"QLD",name: "Queensland"},
    {value:"SA",name: "South Australia"},
    {value:"TAS",name: "Tasmania"},
    {value:"VIC",name: "Victoria"},
    {value:"WA",name: "Western Australia"},
];

export default function ProfileSection() {
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState<ContactType | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [tabs, setTabs] = useState('profile');

    const {state, dispatch} = useContext(UserContext);

    useEffect(() => {
        if(!state) {
            return
        }

        async function getProfileDetail() {
            try {
                setLoading(true);
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me?populate[0]=profile_img`, {
                    headers: {
                        Authorization: `Bearer ${state?.token}`
                    }
                })
    
                const profileData = {
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    profileImg: {src: data?.profile_img?.url ? `${process.env.NEXT_PUBLIC_API_FILE_URL + data.profile_img.url}` : '', alt: "profile picture"},
                    city: data.city,
                    address: data.address,
                    postalCode: data.postal_code,
                    state: data.state,
                }
    
                
                setContact(profileData);
                setLoading(false);
    
            } catch (error) {
                setLoading(false);
                setContact(null);
            }
        }

        getProfileDetail();
    }, [state])


    if(loading) {
        return <Logoloader />;
    }
    

  return (
    <>
    <Modal 
        openModal={openModal}
        setOpenModal={setOpenModal}
        >
            <ProfileUpdate setOpenModal={setOpenModal} 
                
                oldContact={contact} 
                id={state?.id} 
                token={state?.token} 
                setOldContact={setContact} 
                dispatch={dispatch} />
    </Modal>
    
    
    <div className="my-14">

        <ul className="text-left flex items-center gap-1 justify-center mb-8">
            <li className="">
                <button  
                    className={`px-6 md:px-12 py-2 block mb-1 border-b-primary hover:bg-gray-300 hover:text-black border-b-2 ${tabs === "profile" ? "bg-gray-300 text-black" : "bg-gray-100"}`} 
                    onClick={() => setTabs('profile')}>
                        Profile
                </button>
            </li>
            <li className="">
                <button  
                    className={`px-6 md:px-12 py-2 block mb-1 border-b-primary hover:bg-gray-300 hover:text-black border-b-2 ${tabs === "orders" ? "bg-gray-300 text-black" : "bg-gray-100"}`} 
                    onClick={() => setTabs('orders')}>
                        My Orders
                </button>
            </li>
            
        </ul>

        <div >
            {
                tabs === "profile" 
                ? <Profile contact={contact} setOpenModal={setOpenModal} dispatch={dispatch} />
                : <QueryProvider><Orders email={contact?.email} /></QueryProvider>

            }
        </div>
        
    </div>
    </>
  )
}

type OrderType = {
    id: number;
    paymentStatus: string;
    deliveryStatus: string;
    subTotal: number;
    total: number;
}

const Orders = ({email}:{email?: string;}) => {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(false);
    const[page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<any>(null);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [order, setOrder] = useState<any>();
    const [paymentId, setPaymentId] = useState<any>();

    const {data, isPending} = useQuery({queryKey: ['userOrders', page], queryFn: () => getUserOrders(email, page)})

    async function getUserOrders(email: string | undefined, page:number) {
        if(!email) {
            return {orders: [], meta}
        }

        const url = API_URL + `/orders?pagination[pageSize]=5&pagination[page]=${page}&filters[email][$eq]=${email}`;
        try {
            setLoading(true);

            const {data: {data, meta}} = await axios.get(url);

            setLoading(false);
            if(!data) {
                return {orders: [], meta};
            }
            
            return {orders: data, meta}
        } catch(error) {
            setLoading(false);
            return {orders: [], meta}
        }
    }


    function openDetails (id: number) {
        setOrder(data?.orders.filter((item: OrderType) => (item.id === id))[0])
        setOpenOrderModal(true);
    }

    function openPayment (id: number) {
        setPaymentId(data?.orders.filter((item: OrderType) => (item.id === id))[0].id);
        setOpenPaymentModal(true);
    }

    if(data?.orders.length === 0) {
        return <div className="bg-gray-100 max-w-[800px] mx-auto p-8">
            <div className="text-center">
                <p className="mb-4 text-xl">You don&#39;t have any orders.</p>
                <Link href="/shop" className="underline hover:text-primary">Shop With Us</Link>
            </div>
        </div>
    }

    return (
        <>
        <Modal 
            openModal={openOrderModal} 
            setOpenModal={setOpenOrderModal}
        >
            <div className="overflow-auto">
                <BillInfo order={order}/>
            </div>
        </Modal>
        <Modal 
            openModal={openPaymentModal} 
            setOpenModal={setOpenPaymentModal}
        >
            <div className="overflow-auto">
                <PaymentSlip paymentId={paymentId} setOpenModal={setOpenPaymentModal} email={email} />
            </div>
        </Modal>
        <div className=" max-w-[800px] mx-auto  mb-3">
            <div className="overflow-auto">
                <table className="w-full">
                <thead>
                    <tr className="">
                        <th className="border text-left font-bold text-sm px-4 py-2 bg-gray-500 text-white">Order Id</th>
                        <th className="border text-left font-bold text-sm px-4 py-2 bg-gray-500 text-white">Payment</th>
                        <th className="border text-left font-bold text-sm px-4 py-2 bg-gray-500 text-white">Delivery</th>
                        <th className="border text-left font-bold text-sm px-4 py-2 bg-gray-500 text-white">Subtotal</th>
                        <th className="border text-left font-bold text-sm px-4 py-2 bg-gray-500 text-white">Total</th>
                        <th className="border text-left font-bold text-sm px-4 py-2 bg-gray-500 text-white">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {isPending && <Loader />}
                    {
                        data?.orders.map((ordersItem: any) => {
                            const {id} = ordersItem;
                            const {paymentStatus, deliveryStatus, subTotal, total, paymentMethod} = ordersItem.attributes
                            
                            return (
                                <tr key={id}>
                                    <td className="border px-4 py-2">
                                        <span className="text-sm text-black">{id}</span>
                                    </td>
                                    

                                    <td className="border px-4 py-2">
                                        <span className="text-sm text-black">{paymentStatus}</span>						
                                    </td>

                                    <td className="border px-4 py-2">
                                        <span className="text-sm text-black">{deliveryStatus}</span>						
                                    </td>

                                    <td className="border px-4 py-2">
                                        <span className="text-sm text-black">{subTotal}</span>
                                        
                                    </td>

                                    <td className="border px-4 py-2">
                                        <span className="text-sm text-black">{total}</span>
                                    </td>

                                    <td className="border px-4 py-2 text-center">
                                        <button className="underline hover:text-primary text-sm" onClick={() => openDetails(id)}>
                                            Show Details
                                        </button>

                                        {((paymentStatus === "unpaid" || paymentStatus === "cancelled") && paymentMethod === "bankTransfer" ) && <button className="md:ml-4 underline text-primary hover:no-underline text-sm font-semibold" onClick={() => openPayment(id)}>
                                            Add Payment Slip
                                        </button>}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
            </div>
        </div>
            <Pagination pageNumber={page} setPageNumber={setPage} totalPages={data?.meta?.pagination?.pageCount} />
            </>
    )
}

const Profile = ({contact, setOpenModal, dispatch}: {
    contact: ContactType | null; 
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    dispatch: Dispatch<UserActions>
    }) => {
        
    
    const {replace} = useRouter();

    function logOut () {
        dispatch({type: UserTypes.RemoveUser});
        replace('/login')
     }

    return (
        <div className="flex-1 bg-gray-100 max-w-[600px] p-8 mx-auto">
            

            <div className="relative w-20 h-20 rounded-full bg-gray-400 border-4 border-gray-300 mx-auto mb-8">
                {
                    contact?.profileImg?.src ? <Image src={contact.profileImg.src} alt={contact.profileImg.alt} fill className="w-full h-full object-contain rounded-full"/>
                    : <div className="w-full h-full flex items-center justify-center">
                        <FaIcons icon="faUser" className="text-4xl text-white" />
                    </div>
                }
                
            </div>

                <div className="max-w-[400px] mx-auto border-t border-t-gray-300 pt-8">

                    <div className="md:flex md:-mx-2">
                        <div className="mb-6 md:w-1/2 md:mx-2">
                            <label htmlFor="billing_first_name" className="mb-1 inline-block text-sm">Username&nbsp;</label>
                            <p className="text-black">{contact?.username || 'not provided'}</p>
                        </div>
            
                        <div className="mb-6 md:w-1/2 md:mx-2">
                            <label htmlFor="email" className="mb-1 inline-block text-sm">Email&nbsp;</label>
                            <p className="text-black">{contact?.email}</p>
                        </div>
                    </div>

                    <div className="md:flex md:-mx-2">
                        <div className="mb-6 md:w-1/2 md:mx-2">
                            <label htmlFor="phone" className="mb-1 inline-block text-sm">Phone&nbsp;</label>
                            <p className="text-black">{contact?.phone ?? "not provided"}</p>
                        </div>
                        <div className="mb-6 md:w-1/2 md:mx-2">
                            <label htmlFor="email" className="mb-1 inline-block text-sm">Postal Code&nbsp;</label>
                            <p className="text-black">{contact?.postalCode || 'not provided'}</p>
                        </div>
                    </div>
                    <div className="md:flex md:-mx-2">
                        <div className="mb-6 md:w-1/2 md:mx-2">
                            <label htmlFor="phone" className="mb-1 inline-block text-sm">City&nbsp;</label>
                            <p className="text-black">{contact?.city ?? "not provided"}</p>
                        </div>
                        <div className="mb-6 md:w-1/2 md:mx-2">
                            <label htmlFor="email" className="mb-1 inline-block text-sm">State&nbsp;</label>
                            <p className="text-black">{contact?.state || 'not provided'}</p>
                        </div>
                    </div>
                    <div className="md:flex md:-mx-2">
                        <div className="mb-6 md:w-1/2 md:mx-2">
                            <label htmlFor="phone" className="mb-1 inline-block text-sm">Address&nbsp;</label>
                            <p className="text-black">{contact?.address ?? "not provided"}</p>
                        </div>
                        
                    </div>

                    <div className="text-center mt-8 flex flex-col md:flex-row md:justify-center">
                        <Button className="w-auto text-center !py-3 !px-6 mb-2 md:mb-0" name="Update" onClick={() => setOpenModal(true)}/>
                        <Button className="w-auto text-center sm:ml-2 !py-3 !px-6 bg-red " name="Log Out" onClick={logOut}/>
                    </div>
                </div>


        </div>
    )
}

const Modal = ({openModal, children, setOpenModal} : {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>, 
    children: ReactNode
}) => {

    

    return (
        <Portal selector="myportal" show={openModal}>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 z-[60] overflow-auto ">
                <div className="max-w-[670px] mx-auto bg-white my-14 px-8 pt-4 pb-4">
                    <div className="text-right mb-4 leading-0">
                        <button className=" text-red font-bold hover:text-red/80 text-xl leading-0" onClick={() => setOpenModal(false)}>x</button>
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    )
}

const ProfileUpdate = ({setOpenModal, oldContact, id, token, setOldContact, dispatch} : {
    setOpenModal: Dispatch<SetStateAction<boolean>>, 
    oldContact: ContactType | null, 
    id?: number; 
    token?: string;
    setOldContact: Dispatch<SetStateAction<ContactType | null>>
    dispatch: Dispatch<UserActions>
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [contact, setContact] = useState<ContactType>({
        username: '',
        phone: '',
        city: '',
        address: '',
        postalCode: '',
        state: '',
    });

    useEffect(() => {
        setContact({
            username: oldContact?.username ?? '',
            phone: oldContact?.phone ?? '',
            city: oldContact?.city ?? '',
            address: oldContact?.address ?? '',
            postalCode: oldContact?.postalCode ?? '',
            state: oldContact?.state ?? '',
        })
    }, [oldContact])


    async function updateProfile (e: FormEvent) {
        try {
            e.preventDefault();

            setLoading(true);
            setError('');

            if(!id || !token ) return;
            
            const url = API_URL + `/users/${id}`;
            let newData = null;
            
                const {data} = await axios.put(url, {...contact, postal_code: contact.postalCode},{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                } 
                );


                newData = data;



            setLoading(false);

            if(!newData) {
                return;
            }

            
            const profileData = {
                username: newData.username,
                email: newData.email,
                phone: newData.phone,
                profileImg: newData.profile_img,
                city: newData.city,
                address: newData.address,
                postalCode: newData.postal_code,
                state: newData.state,
            }

            
            setOpenModal(false);
            dispatch({
                type: UserTypes.UpdateUser, 
                payload: {
                    id,
                    token,
                    username: newData.username,
                    address: newData.address,
                    postalCode: newData.postal_code,
                    state: newData.state,
                    city: newData.city,
                }
            })
            setOldContact(profileData);
            
        } catch (error) {
            setLoading(false);
            setError('server error')
        }
        

    }


    

    return (
                    <div>
                        {loading && <Loader />}
                        {error && <p className="text-center text-red mb-4">{error}</p>}
                        <form className="mb-8" onSubmit={updateProfile}>

                            <div className="md:flex md:-mx-2">
                                
                                <div className="mb-3 md:w-1/2 md:mx-2">
                                    <label htmlFor="billing_first_name" className="mb-1 inline-block text-sm">Username</label>
                                    <Input 
                                        type="text" 
                                        name="billing_first_name" 
                                        placeholder="" 
                                        value={contact.username}
                                        onChange={(e) => setContact({...contact, username: e.target.value})}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="mb-3 md:w-1/2 md:mx-2">
                                    <label htmlFor="phone" className="mb-1 inline-block text-sm">Phone&nbsp;
                                            </label>
                                        <Input 
                                            type="text"
                                            name="phone" 
                                            placeholder="" 
                                            value={contact.phone}
                                            error=""
                                            onChange={(e) => setContact({...contact, phone: e.target.value})} 
                                            disabled={loading}
                                            />
                                </div>
                    
                            </div>

                            <div className="md:flex md:-mx-2">
                                <div className="mb-3 md:w-1/2 md:mx-2">
                                    <label htmlFor="billing_first_name" className="mb-1 inline-block text-sm">City&nbsp;</label>
                                    <Input 
                                        type="text" 
                                        name="billing_first_name" 
                                        placeholder="" 
                                        value={contact.city}
                                        onChange={(e) => setContact({...contact, city: e.target.value})}
                                        disabled={loading}
                                    />
                                </div>
                    
                                <div className="mb-3 md:w-1/2 md:mx-2">
                                    <label htmlFor="email" className="mb-1 inline-block text-sm">State</label>
                                    <Select 
                                        options={selectData} 
                                        onChange={(e) => {
                                            setContact((prev) => ({...prev, state: e.target.value}))
                                           
                                        }} 
                                        defaultValue={''}
                                        value={contact.state || ''} 
                                        name="state"
                                        className="!mb-0"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:-mx-2">
                                <div className="mb-3 md:w-1/2 md:mx-2">
                                    <label htmlFor="billing_first_name" className="mb-1 inline-block text-sm">Postal code&nbsp;</label>
                                    <Input 
                                        type="text" 
                                        name="billing_first_name" 
                                        placeholder="" 
                                        value={contact.postalCode}
                                        onChange={(e) => setContact({...contact, postalCode: e.target.value})}
                                        disabled={loading}
                                    />
                                </div>
                    
                                <div className="mb-3 md:w-1/2 md:mx-2">
                                    <label htmlFor="email" className="mb-1 inline-block text-sm">Address</label>
                                    <Input 
                                        type="text" 
                                        name="email" 
                                        placeholder="" 
                                        value={contact.address}
                                        
                                        onChange={(e) => {
                                            setContact({...contact, address: e.target.value})
                                            
                                        }}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-auto text-center !py-3 !px-6 mt-6" name="Update" disabled={loading} />
                        </form>
                    </div>
    )
}

const PaymentSlip = ({paymentId, setOpenModal, email}:{paymentId: number, setOpenModal: Dispatch<SetStateAction<boolean>>, email?:string;}) => {
    const mutation = useMutation({mutationFn: paymentSlipUpload})
    const queryClient = useQueryClient()

    
    const [file, setFile] = useState<File | undefined>();
    const [error, setError] = useState("");

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];
        setFile(file)

    }

    async function paymentSlipUpload (e: FormEvent) {
        try {
            e.preventDefault()
            setError("");

            if(!file || !email) {
                setError("Please add file.")
                return;
            }

            const url = API_URL + `/orders/${paymentId}`;

            const formData = new FormData();
            formData.append("files.paymentSlip", file, file.name);
            formData.append("data", JSON.stringify({email}));

            const data = await axios.put(url, formData);

            

            if(!data) {
                setError('Error uploading')
                return;
            }

            setOpenModal(false);
            queryClient.invalidateQueries({ queryKey: ['userOrders'] })
            return

        } catch (error) {
            setError("Server error")
        }
        
    }


    return (
        <div>
            <h2 className="mb-4">Once you have deposited the required amount in our bank account. Add the copy of payment slip here for verification. </h2>
            {error && <p className="text-red text-sm mb-2">{error}</p>}
                <form onSubmit={paymentSlipUpload}>
                    <FileInput onChange={handleFile} className="!ml-0" />
                    <Button type="submit" className="w-auto text-center !py-3 !px-6 mt-6" name="Submit" disabled={mutation.isPending} />
                </form>
        </div>
    )
}