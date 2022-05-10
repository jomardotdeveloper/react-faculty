import React, { useContext, useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { Link } from "react-router-dom";
import {
  Block,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  Button,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
} from "../../../components/Component";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge } from "reactstrap";
import { cData, categoryOptions } from "./CData";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../../images/product/h.png";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import { RSelect } from "../../../components/Component";
import { ProductContext } from "./CContext";
import axios from "axios";
import { fData } from "../faculty/FData";
const CList = () => {
  // const currentLevel = match.params.level;
  const { contextData } = useContext(ProductContext);
  const [data, setData] = contextData;
  // const [data, setData] = useState(fData);
  const [smOption, setSmOption] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    career: "",
    rating: "",
    date: "",
    place: "",
    lnumber: "",
    ldate: "",
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [files, setFiles] = useState([]);
  const URL = "http://127.0.0.1:8000/api/";

  // useEffect(() => {
  //   const id = match.params.level;
  //   if (id !== undefined || null || "") {
  //     // let product = data.find((item) => item.id === Number(id));
  //     // setCurrent(product);
  //   } else {
  //     // setCurrent(data[0]);
  //   }
  //   console.log(id);
  // }, [match.params.level]);
  async function accept(id) {
    var res = await axios.get(URL + "faculty/accept/" + id);
    var response = res.data;
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    let userId = newData[index].user.id;
    if (response.success) {
      newData[index].user.can_login = true;
      setData([...newData]);
    }
  }

  async function refuse(id) {
    var res = await axios.get(URL + "faculty/refuse/" + id);
    var response = res.data;
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    let userId = newData[index].user.id;
    if (response.success) {
      newData[index].user.can_login = false;
      setData([...newData]);
    }
  }

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = cData.filter((item) => {
        return (
          item.faculty.attr.full_name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.career.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.rating.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.place.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...cData]);
    }
  }, [onSearchText]);

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // category change
  const onCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const close = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      career: "",
      rating: "",
      date: "",
      place: "",
      lnumber: "",
      ldate: "",
    });
  };

  const onFormSubmit = async (form) => {
    // const { title, price, sku, stock } = form;
    // let submittedData = {
    //   id: data.length + 1,
    //   name: title,
    //   img: files.length > 0 ? files[0].preview : ProductH,
    //   sku: sku,
    //   price: price,
    //   stock: stock,
    //   category: formData.category,
    //   fav: false,
    //   check: false,
    // };
    form.user_id = user.id;
    var res = await axios.post("http://127.0.0.1:8000/api/civil/create", form);
    var response = res.data;
    console.log(response);
    if (response.success) {
      setData([response.data, ...data]);
      cData.push(response.data);
      setView({ open: false });
      setFiles([]);
      resetForm();
    }
    // console.log(response);
  };

  const onDeleteClick = async (id) => {
    let newData;
    var res = await axios.get("http://127.0.0.1:8000/api/civil/delete/" + id);
    var response = res.data;
    if (response.success) {
      let newitems = data;
      let index = newitems.findIndex((item) => item.id === id);
      cData.splice(index, 1);
      newData = data.filter((item) => item.id !== id);
      setData([...newData]);
    }
  };

  const onEditSubmit = async (form) => {
    let newItems = data;
    let index = newItems.findIndex((item) => item.id === editId);

    // newItems.forEach(async (item) => {
    //   if (item.id === editId) {
    //     // submittedData = {
    //     //   id: data.length + 1,
    //     //   name: title,
    //     //   img: files.length > 0 ? files[0].preview : item.img,
    //     //   sku: sku,
    //     //   price: price,
    //     //   stock: stock,
    //     //   category: formData.category,
    //     //   fav: false,
    //     //   check: false,
    //     // };
    //   }
    // });
    form.govt = form.govt ? 1 : 0;
    var res = await axios.post("http://127.0.0.1:8000/api/civil/update/" + editId, form);
    var response = res.data;
    if (response.success) {
      cData.splice(index, 1, response.data);
      newItems[index] = response.data;
      setView({ edit: false, add: false });
      resetForm();
    }
    // newItems[index] = submittedData;
    // //setData(newItems);
    // resetForm();
    // setView({ edit: false, add: false });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          career: item.career,
          rating: item.rating,
          date: item.date,
          place: item.place,
          lnumber: item.lnumber,
          ldate: item.ldate,
        });
      }
    });

    setEditedId(id);
    setFiles([]);
    setView({ add: false, edit: true });
  };

  // selects all the products
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to delete a product
  const deleteProduct = (id) => {
    let defaultData = data;
    defaultData = defaultData.filter((item) => item.id !== id);
    setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteProduct = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // const currentItems = [];
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();
  const { errors: errors2, register: register2, handleSubmit: handleSubmit2 } = useForm();
  // alert(match.params.level);
  // console.log(match);
  return (
    <React.Fragment>
      <Head title="Faculty List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Civil Service Eligibility</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Search Filter"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      {/* <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown> */}
                    </li>
                    {!user.is_admin ? (
                      <li className="nk-block-tools-opt">
                        <Button
                          className="toggle btn-icon d-md-none"
                          color="primary"
                          onClick={() => {
                            toggle("add");
                          }}
                        ></Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          onClick={() => {
                            toggle("add");
                          }}
                        >
                          <span>Add</span>
                        </Button>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Card className="card-bordered">
            <div className="card-inner-group">
              <div className="card-inner p-0">
                <DataTableBody>
                  <DataTableHead>
                    {/* COLUMN STARTS HERE */}
                    <DataTableRow size="sm">
                      <span>Name</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Career Service</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Rating</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Date of examination</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Place of examination </span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools"></DataTableRow>
                  </DataTableHead>
                  {/* DATA STARTS HERE */}
                  {currentItems.length > 0
                    ? currentItems.map((item) => {
                        {
                          /* if (item.level == currentLevel) { */
                        }
                        return (
                          <DataTableItem key={item.id}>
                            <DataTableRow size="sm">
                              <span className="tb-product">
                                <Link to={`${process.env.PUBLIC_URL}/civil/${item.id}`}>
                                  <span className="title">{item.faculty.attr.full_name}</span>
                                </Link>
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.career}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.rating}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.date}</span>
                            </DataTableRow>
                            {/* <DataTableRow size="md">
                              <span className="tb-sub">{item.msalary}</span>
                            </DataTableRow>
                            <DataTableRow size="md">
                              <span className="tb-sub">{item.salary}</span>
                            </DataTableRow>
                            <DataTableRow size="md">
                              <span className="tb-sub">{item.status}</span>
                            </DataTableRow> */}
                            <DataTableRow size="md">
                              <span className="tb-sub">{item.place}</span>
                            </DataTableRow>
                            <DataTableRow className="nk-tb-col-tools">
                              <ul className="nk-tb-actions gx-1 my-n1">
                                <li className="mr-n1">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      tag="a"
                                      href="#more"
                                      onClick={(ev) => ev.preventDefault()}
                                      className="dropdown-toggle btn btn-icon btn-trigger"
                                    >
                                      <Icon name="more-h"></Icon>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                      <ul className="link-list-opt no-bdr">
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#edit"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              onEditClick(item.id);
                                              toggle("edit");
                                            }}
                                          >
                                            <Icon name="edit"></Icon>
                                            <span>Edit</span>
                                          </DropdownItem>
                                        </li>
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#delete"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              onDeleteClick(item.id);
                                              // onEditClick(item.id);
                                              // toggle("edit");
                                            }}
                                          >
                                            <Icon name="trash"></Icon>
                                            <span>Delete</span>
                                          </DropdownItem>
                                        </li>
                                        {/* <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#view"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              onEditClick(item.id);
                                              toggle("details");
                                            }}
                                          >
                                            <Icon name="eye"></Icon>
                                            <span>View</span>
                                          </DropdownItem>
                                        </li>
                                        {!item.user.can_login ? (
                                          <li>
                                            <DropdownItem
                                              tag="a"
                                              href="#accept"
                                              onClick={(ev) => {
                                                ev.preventDefault();
                                                accept(item.id);
                                                // toggle("details");
                                              }}
                                            >
                                              <Icon name="user-check"></Icon>
                                              <span>Accept</span>
                                            </DropdownItem>
                                          </li>
                                        ) : (
                                          ""
                                        )}
                                        {item.user.can_login ? (
                                          <li>
                                            <DropdownItem
                                              tag="a"
                                              href="#refuse"
                                              onClick={(ev) => {
                                                ev.preventDefault();
                                                refuse(item.id);
                                              }}
                                            >
                                              <Icon name="user-cross"></Icon>
                                              <span>Refuse</span>
                                            </DropdownItem>
                                          </li>
                                        ) : (
                                          ""
                                        )} */}
                                      </ul>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </li>
                              </ul>
                            </DataTableRow>
                          </DataTableItem>
                        );
                        {
                          /* } */
                        }
                      })
                    : null}
                </DataTableBody>
                <div className="card-inner">
                  {data.length > 0 ? (
                    <PaginationComponent
                      itemPerPage={itemPerPage}
                      totalItems={data.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-silent">No data found</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Block>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-modal-head">
              <h4 className="nk-modal-title title">
                Product <small className="text-primary">#{formData.sku}</small>
              </h4>
              <img src={formData.img} alt="" />
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Product Name</span>
                  <span className="caption-text">{formData.name}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Product Price</span>
                  <span className="caption-text">$ {formData.price}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Product Category</span>
                  <span className="caption-text">
                    {/* {formData.category.map((item) => (
                      <Badge className="mr-1" color="secondary">
                        {item.value}
                      </Badge>
                    ))} */}
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Stock</span>
                  <span className="caption-text"> {formData.stock}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.add ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add</BlockTitle>
              <BlockDes>{/* <p>Work Experience.</p> */}</BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Career service
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="career"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.career}
                      />
                      {errors.career && <span className="invalid">{errors.career.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Rating
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="rating"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.rating}
                      />
                      {errors.rating && <span className="invalid">{errors.rating.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Date of examination
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.date}
                      />
                      {errors.date && <span className="invalid">{errors.date.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Place of examination
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="place"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.place}
                      />
                      {errors.place && <span className="invalid">{errors.place.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      License Number
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="lnumber"
                        ref={register({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.lnumber}
                      />
                      {errors.lnumber && <span className="invalid">{errors.lnumber.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      License Date of Validity
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="date"
                        name="ldate"
                        ref={register({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.ldate}
                      />
                      {errors.ldate && <span className="invalid">{errors.ldate.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    {/* <Icon className="plus"></Icon> */}
                    <span>Save</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>
        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.edit ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Edit</BlockTitle>
              <BlockDes>
                <p>Work Experience.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit2(onEditSubmit)}>
              <Row className="g-3">
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Career service
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="career"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.career}
                      />
                      {errors2.career && <span className="invalid">{errors2.career.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Rating
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="rating"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.rating}
                      />
                      {errors2.rating && <span className="invalid">{errors2.rating.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Date of examination
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.date}
                      />
                      {errors2.date && <span className="invalid">{errors2.date.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Place of examination
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="place"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.place}
                      />
                      {errors2.place && <span className="invalid">{errors2.place.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      License Number
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="lnumber"
                        ref={register2({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.lnumber}
                      />
                      {errors2.lnumber && <span className="invalid">{errors2.lnumber.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      License Date of Validity
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="date"
                        name="ldate"
                        ref={register2({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.ldate}
                      />
                      {errors2.ldate && <span className="invalid">{errors2.ldate.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    {/* <Icon className="plus"></Icon> */}
                    <span>Save</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
        {view.edit && <div className="toggle-overlay" onClick={close}></div>}
      </Content>
    </React.Fragment>
  );
};

export default CList;
