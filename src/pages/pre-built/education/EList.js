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
import { eData, categoryOptions } from "./EData";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../../images/product/h.png";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import { RSelect } from "../../../components/Component";
import { ProductContext } from "./EContext";
import axios from "axios";
import { fData } from "../faculty/FData";
const EList = ({ match }) => {
  const currentLevel = match.params.level;
  const { contextData } = useContext(ProductContext);
  const [data, setData] = contextData;
  const user = JSON.parse(localStorage.getItem("user"));
  // const [data, setData] = useState(fData);
  const [smOption, setSmOption] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    level: "",
    from: "",
    to: "",
    units: "",
    honors: "",
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
      const filteredObject = eData.filter((item) => {
        return (
          item.faculty.attr.full_name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.units.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.honors.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...eData]);
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
      name: "",
      course: "",
      level: "",
      from: "",
      to: "",
      units: "",
      honors: "",
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
    form.level = currentLevel;
    form.user_id = user.id;
    var res = await axios.post("http://127.0.0.1:8000/api/education/create", form);
    var response = res.data;

    if (response.success) {
      setData([response.data, ...data]);
      eData.push(response.data);
      setView({ open: false });
      setFiles([]);
      resetForm();
    }
    // console.log(response);
  };

  const onDeleteClick = async (id) => {
    let newData;
    var res = await axios.get("http://127.0.0.1:8000/api/education/delete/" + id);
    var response = res.data;
    if (response.success) {
      let newitems = data;
      let index = newitems.findIndex((item) => item.id === id);
      eData.splice(index, 1);
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
    var res = await axios.post("http://127.0.0.1:8000/api/education/update/" + editId, form);
    var response = res.data;
    if (response.success) {
      eData.splice(index, 1, response.data);
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
          name: item.name,
          course: item.course,
          level: item.level,
          from: item.from,
          to: item.to,
          units: item.units,
          honors: item.honors,
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
              <BlockTitle>Education Background</BlockTitle>
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
                      <span>School Name</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Period of Attendance</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>Units Earned</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>Honors</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools"></DataTableRow>
                  </DataTableHead>
                  {/* DATA STARTS HERE */}
                  {currentItems.length > 0
                    ? currentItems.map((item) => {
                        if (item.level == currentLevel) {
                          return (
                            <DataTableItem key={item.id}>
                              <DataTableRow size="sm">
                                <span className="tb-product">
                                  <Link to={`${process.env.PUBLIC_URL}/education/detail/${item.id}`}>
                                    <span className="title">{item.faculty.attr.full_name}</span>
                                  </Link>
                                </span>
                              </DataTableRow>
                              <DataTableRow>
                                <span className="tb-sub">{item.name}</span>
                              </DataTableRow>
                              <DataTableRow>
                                <span className="tb-sub">{item.from + " - " + item.to}</span>
                              </DataTableRow>
                              <DataTableRow size="md">
                                <span className="tb-sub">{item.units}</span>
                              </DataTableRow>
                              <DataTableRow size="md">
                                <span className="tb-sub">{item.honors}</span>
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
              <BlockDes>
                <p>Education Information.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Name of School
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.name}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Course
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="course"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.course}
                      />
                      {errors.course && <span className="invalid">{errors.course.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      From
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="date"
                        className="form-control"
                        name="from"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.from}
                      />
                      {errors.from && <span className="invalid">{errors.from.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      To
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="date"
                        className="form-control"
                        name="to"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.to}
                      />
                      {errors.to && <span className="invalid">{errors.to.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Highest Units Earned
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="units"
                        ref={register({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.units}
                      />
                      {errors.units && <span className="invalid">{errors.units.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Honors Received
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="honors"
                        ref={register({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.honors}
                      />
                      {errors.honors && <span className="invalid">{errors.honors.message}</span>}
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
                <p>Education Information.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit2(onEditSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Name of School
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.name}
                      />
                      {errors2.name && <span className="invalid">{errors2.name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Course
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="course"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.course}
                      />
                      {errors2.course && <span className="invalid">{errors2.course.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      From
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="date"
                        className="form-control"
                        name="from"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.from}
                      />
                      {errors2.from && <span className="invalid">{errors2.from.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      To
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="date"
                        className="form-control"
                        name="to"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.to}
                      />
                      {errors2.to && <span className="invalid">{errors2.to.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Highest Units Earned
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="units"
                        ref={register2({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.units}
                      />
                      {errors2.units && <span className="invalid">{errors2.units.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Honors Received
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="honors"
                        ref={register2({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.honors}
                      />
                      {errors2.honors && <span className="invalid">{errors2.honors.message}</span>}
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

export default EList;
