import React, { useState, useEffect } from "react";
import "./contact.css";
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Divider, Form, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, AimOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";

const { Search } = Input;

const Contact = () => {

    const [delivery, setDelivery] = useState([]);
    let history = useHistory();

    const onFinish = async (values) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var date = yyyy + "-" + mm + "-" + dd;

        try {
            const formatData = {
                "email": values.email,
                "username": values.username,
                "password": values.password,
                "phone": values.phoneNo,
                "role": "isClient",
                "status": "actived"
            }
            await axiosClient.post("http://localhost:3100/api/auth/register", formatData)
                .then(response => {
                    console.log(response);
                    if (response === "Email is exist") {
                        return notification["error"]({
                            message: "Thông báo",
                            description: "Email đã tồn tại",

                        });
                    }
                    if (response === undefined) {
                        notification["error"]({
                            message: "Thông báo",
                            description: "Đăng ký thất bại",

                        });
                    }
                    else {
                        notification["success"]({
                            message: "Thông báo",
                            description: "Đăng kí thành công",
                        });
                        setTimeout(function () {
                            history.push("/login");
                        }, 1000);
                    }
                }
                );
        } catch (error) {
            throw error;
        }
    }
    return (
        <div>
            {/* <section class="page-title bg-1">
                <div class="overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="block text-center">
                                <span class="text-white">Contact Us</span>
                                <h1 class="text-capitalize mb-5 text-lg">Get in Touch</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section class="section contact-info pb-0">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-sm-6 col-md-6">
                            <div class="contact-block mb-4 mb-lg-0">
                                <i class="icofont-live-support"></i>
                                <h5>Liên Hệ Hotline</h5>
                                +032-8938-93802
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-md-6">
                            <div class="contact-block mb-4 mb-lg-0">
                                <i class="icofont-support-faq"></i>
                                <h5>Email</h5>
                                contact@mail.com
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-md-6">
                            <div class="contact-block mb-4 mb-lg-0">
                                <i class="icofont-location-pin"></i>
                                <h5>Địa chỉ</h5>
                                Chi nhánh 1: 350-352 Võ Văn Kiệt, <br />
                                Phường Cô Giang Quận 1, Thành phố Hồ Chí Minh
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="contact-form-wrap section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="section-title text-center">
                                <h2 class="text-md mb-2">Liên Hệ Ngay</h2>
                                <div class="divider mx-auto my-4"></div>
                                <p class="mb-5">DaStore giúp được gì cho bạn??</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <form id="contact-form" class="contact__form " method="post" action="mail.php">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="alert alert-success contact__msg d-none" role="alert">
                                            Your message was sent successfully.
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <input name="name" id="name" type="text" class="form-control" placeholder="Nhập tên" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <input name="email" id="email" type="email" class="form-control" placeholder="Nhập địa chỉ" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <input name="subject" id="subject" type="text" class="form-control" placeholder="Nhập chủ đề" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <input name="phone" id="phone" type="text" class="form-control" placeholder="Nhập số điện thoại" />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group-2 mb-4">
                                    <textarea name="message" id="message" class="form-control" rows="8" placeholder="Lời nhắn"></textarea>
                                </div>

                                <div class="text-center">
                                    <Button type="primary w-25 my-4 rounded-4" block>
                                        Hoàn thành
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact;
