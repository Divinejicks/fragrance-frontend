import { useEffect, useRef, useState } from "react";
import { NavBar } from "../navbar/navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Autoplay, Navigation, Pagination as SwiperPagination } from "swiper/modules";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.jpg";
import image7 from "../../assets/image7.jpg";
import image8 from "../../assets/image8.jpg";
import image9 from "../../assets/image9.jpg";
import image10 from "../../assets/image10.jpg";
import { Input, Pagination as AntPagination, Table, Button } from "antd";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import 'animate.css';
import Footer from "../footer/footer";

export const HomePage = () => {
    const whatsappNum = "+237676669367"; 
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem("user-orders");
        return saved ? JSON.parse(saved) : [];
    });
    const [page, setPage] = useState(1);
    const pageSize = 6;

    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("user-orders", JSON.stringify(orders));
    }, [orders]);

    const heroSlides = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10
    ];

    const dummyProducts = [
        {
            _id: "1",
            name: "Royal Oud",
            description: "A majestic blend with woody and spicy tones.",
            image: image1,
            priceDozen: 2000,
            priceUnit: 3500,
            qty: 1,
        },
        {
            _id: "2",
            name: "Amber Bliss",
            description: "Warm amber wrapped in soft florals.",
            image: image2,
            priceDozen: 1500,
            priceUnit: 2800,
            qty: 1,
        },
        {
            _id: "3",
            name: "Citrus Bloom",
            description: "Zesty citrus with a floral finish.",
            image: image3,
            priceDozen: 2000,
            priceUnit: 2500,
            qty: 1,
        },
        {
            _id: "4",
            name: "Velvet Night",
            description: "Smooth and sensual for night outs.",
            image: image4,
            priceDozen: 1400,
            priceUnit: 3000,
            qty: 1,
        },
        {
            _id: "5",
            name: "Fresh Fields",
            description: "Green and breezy freshness.",
            image: image5,
            priceDozen: 1100,
            priceUnit: 2200,
            qty: 1,
        },
        {
            _id: "6",
            name: "Spice Route",
            description: "Bold and exotic spicy aromas.",
            image: image6,
            priceDozen: 1600,
            priceUnit: 3200,
            qty: 1,
        },
        {
            _id: "7",
            name: "Ocean Mist",
            description: "Clean aquatic tones for daily freshness.",
            image: image7,
            priceDozen: 1300,
            priceUnit: 2600,
            qty: 1,
        },
    ];

    useEffect(() => {
        // Simulate fetch
        setProducts(dummyProducts);
        setFiltered(dummyProducts);
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
        const result = products.filter((p) =>
            p.name.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(result);
    };

    const handleQtyChange = (productId, newQty) => {
        setFiltered((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId
                    ? { ...product, qty: newQty }
                    : product
            )
        );
    };

    const addToOrder = (product, quantity) => {
        if (!quantity || quantity < 1) return;
        const existing = orders.find((o) => o.id === product._id);
        let unitPrice = quantity >= 6 ? product.priceDozen : product.priceUnit;
        if (existing) {
            existing.quantity += quantity;
            unitPrice = existing.quantity >= 6 ? product.priceDozen : product.priceUnit;
            existing.total = existing.quantity * unitPrice;
            existing.unitPrice = unitPrice;
            setOrders([...orders]);
        } else {
            setOrders([
                ...orders,
                {
                    id: product._id,
                    name: product.name,
                    unitPrice,
                    quantity,
                    total: quantity * unitPrice,
                },
            ]);
        }

        Swal.fire({
            title: '🎉 Order Confirmed!',
            text: 'Your order has been added to the order list BELOW. Remember to submit your list when you are done.',
            icon: 'success',
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
            confirmButtonColor: '#4CAF50',
        });

        handleQtyChange(product._id, 1);

    };

    const handleSubmit = () => {
        // Prepare the order details message
        let orderMessage = "Hello The Fragrance, I would like to place an order:\n\n";

        orders.forEach((order) => {
            orderMessage += `Product: ${order.name}\nQuantity: ${order.quantity}\nTotal: FCFA ${order.total.toLocaleString()}\n\n`;
        });

        orderMessage += `Grand Total: FCFA ${orders.reduce((total, item) => total + item.total, 0).toLocaleString()}\n\nThank you!`;

        // Create the WhatsApp link
        const whatsappLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(orderMessage)}`;

        // Open WhatsApp chat with the order message
        window.open(whatsappLink, "_blank");

        // Clear the orders and local storage
        setOrders([]);
        localStorage.removeItem("user-orders");
    };


    const columns = [
        {
            title: "Perfume",
            dataIndex: "name",
            key: "name",
            className: "font-semibold",
        },
        {
            title: "Qty",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Unit Price",
            dataIndex: "unitPrice",
            key: "unitPrice",
            render: (price) => `FCFA ${price.toLocaleString()}`,
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (total) => `FCFA ${total.toLocaleString()}`,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        danger
                        onClick={() => handleDelete(record.id, record.name)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const handleDelete = (id, name) => {
        const filtered = orders.filter((o) => o.id !== id);
        setOrders(filtered);
        toast.success(`${name} has been removed from your order list!`);
    };


    const paginatedProducts = filtered.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    return (
        <div ref={formRef}>
            <NavBar path="home" />
            <section className="relative h-screen w-full overflow-hidden">
                <Swiper
                    modules={[Navigation, SwiperPagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop
                >
                    {heroSlides.map((img, i) => (
                        <SwiperSlide key={i} className="h-screen">
                            <img
                                src={img}
                                alt={`Hero Slide ${i + 1}`}
                                className="w-full h-screen object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Background overlay with opacity */}
                <div className="absolute inset-0 bg-black opacity-50 z-10" />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-4">
                    <div className="mb-10">
                        <p className="pb-2 text-center">
                            <span className="font-serif font-bold text-rd-white text-2xl md:text-5xl">Elegance, in Every </span>
                            <span className="font-serif font-bold text-rd-gold text-2xl md:text-5xl">Drop</span>
                        </p>
                        <p className="pt-10 font-serif font-medium text-rd-white text-2xl md:text-4xl text-center">
                            WHERE LUXURY MEETS FRAGRANCE.
                        </p>

                        <p className="pt-5 px-4 text-center text-rd-champagne font-serif font-medium text-2xl md:text-4xl italic tracking-wide">
                            <span className="text-rd-gold">Note:</span> After placing your order, a dedicated fragrance consultant will follow up with you via WhatsApp.
                        </p>

                    </div>
                </div>
            </section>
            <section className="px-4 py-12 bg-black text-white font-serif">
                <h2 className="text-4xl text-center text-yellow-400 mb-8 font-bold">
                    Our Products & Prices
                </h2>

                <div className="max-w-xl mx-auto mb-10">
                    <Input.Search
                        placeholder="Search perfumes by name..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        enterButton
                        className="rounded"
                    />
                </div>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                    {paginatedProducts.map((product) => {
                        const pricePerUnit =
                            product.qty >= 6 ? product.priceDozen : product.priceUnit;

                        return (
                            <div
                                key={product._id}
                                className="bg-blue-900 rounded-2xl shadow-lg p-4 text-white"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-bold text-yellow-200">
                                    {product.name}
                                </h3>
                                <p className="text-sm italic text-gray-300">
                                    {product.description}
                                </p>
                                <p className="mt-2 text-yellow-400 font-semibold">
                                    FCFA {product.priceDozen} / dozen
                                </p>
                                <p className="text-yellow-100 text-sm">
                                    FCFA {product.priceUnit} per unit (less than 6)
                                </p>

                                <div className="mt-4">
                                    <label className="block text-sm mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={product.qty}
                                        onChange={(e) => handleQtyChange(product._id, Number(e.target.value))}
                                        className="w-full rounded p-2 text-black bg-white border border-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
                                    />
                                    <p className="text-xs mt-2">
                                        Total: FCFA {(product.qty * pricePerUnit).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => addToOrder(product, product.qty)}
                                        className="mt-3 w-full cursor-pointer bg-yellow-400 text-black font-semibold rounded py-2 hover:bg-yellow-300 transition"
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <AntPagination
                        current={page}
                        total={filtered.length}
                        pageSize={pageSize}
                        onChange={(p) => setPage(p)}
                        className="text-yellow-400"
                    />
                </div>

                {orders.length > 0 && (
                    <div className="mt-16 mx-auto px-4 max-w-6xl">
                        <h3 className="text-3xl text-center text-yellow-400 font-semibold mb-6">
                            Your Order List
                        </h3>

                        <div className="overflow-x-auto rounded shadow-lg bg-white ">
                            <Table
                                columns={columns}
                                dataSource={orders.map((o, i) => ({ ...o, key: i }))}
                                pagination={false}
                                bordered
                                className="bg-white rounded"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                            <div className="text-lg font-semibold text-right text-white md:text-xl">
                                Grand Total:{" "}
                                <span className="text-green-600">
                                    FCFA {orders.reduce((total, item) => total + item.total, 0).toLocaleString()}
                                </span>
                            </div>

                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="bg-yellow-400 cursor-pointer text-black font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-yellow-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                Submit Order
                            </button>

                        </div>
                    </div>
                )}

            </section>
            <Footer />
        </div>
    );
}