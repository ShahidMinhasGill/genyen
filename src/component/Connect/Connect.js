import React from 'react'
import { IoMdClose } from "react-icons/io";
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Connect({ modalShow, setModalShow }) {
    return (
        <div>
            <Modal
                show={modalShow} onHide={() => {
                    setModalShow(false)
                }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body className='modal-color'>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 d-flex- justify-content-end">
                            <IoMdClose
                                onClick={() => setModalShow(false)}
                                size={28}
                                className="icon-color"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-6 col-sm-6">
                            <div className="card-title text-center">
                                <h2 className=" login-main-heading text-black"> MetaMask</h2>
                            </div>
                            <div className=" shadow">
                                <div className="card-body text-start ">
                                    <div className="mb-4">
                                        <label className="form-label form-heading lable-text">Please Download MetaMask link is bleow</label>
                                        <a href="https://metamask.io/" target='-blank'>Clik Here</a>
                                    </div>
                                    <a href="/"> <button className="btn connect-btn   " >
                                        Home Page
                                    </button></a>


                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
