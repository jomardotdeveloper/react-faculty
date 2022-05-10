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
import { pData, categoryOptions } from "./PData";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../../images/product/h.png";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import { RSelect } from "../../../components/Component";
import { ProductContext } from "./PContext";
import axios from "axios";
// import { fData } from "../faculty/FData";
const PList = () => {
  const [defaultFiles, setDefaultFiles] = useState("");
  const [defaultFiles2, setDefaultFiles2] = useState("");
  // const currentLevel = match.params.level;
  const user = JSON.parse(localStorage.getItem("user"));

  const { contextData } = useContext(ProductContext);
  const [data, setData] = contextData;
  // const [data, setData] = useState(fData);
  const [smOption, setSmOption] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    hours: "",
    ld: "",
    from: "",
    to: "",
    sponsor: "",
    cover: "",
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
      const filteredObject = pData.filter((item) => {
        return (
          item.faculty.attr.full_name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.title.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.hours.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.ld.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...pData]);
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
      title: "",
      hours: "",
      ld: "",
      from: "",
      to: "",
      sponsor: "",
      cover: "",
    });
  };

  const onFormSubmit = async (form) => {
    let postData = new FormData();
    console.log(form);
    postData.append("cert", defaultFiles);
    postData.append("user_id", user.id);
    postData.append("ld", form.ld);
    postData.append("cover", form.cover);
    postData.append("from", form.from);
    postData.append("to", form.to);
    postData.append("title", form.title);
    postData.append("hours", form.hours);
    postData.append("sponsor", form.sponsor);

    await fetch("http://127.0.0.1:8000/api/program/create", {
      method: "post",
      body: postData,
    })
      .then((response) => response.json())
      .then((result) => {
        pData.push(result.data);
        setData([result.data, ...data]);
        resetForm();
        setView({ open: false });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onDeleteClick = async (id) => {
    let newData;
    var res = await axios.get("http://127.0.0.1:8000/api/program/delete/" + id);
    var response = res.data;
    if (response.success) {
      let newitems = data;
      let index = newitems.findIndex((item) => item.id === id);
      pData.splice(index, 1);
      newData = data.filter((item) => item.id !== id);
      setData([...newData]);
    }
  };

  const onEditSubmit = async (form) => {
    let newItems = data;
    let index = newItems.findIndex((item) => item.id === editId);

    let postData = new FormData();
    if (defaultFiles2) postData.append("cert", defaultFiles2);
    postData.append("ld", form.ld);
    postData.append("cover", form.cover);
    postData.append("from", form.from);
    postData.append("to", form.to);
    postData.append("title", form.title);
    postData.append("hours", form.hours);
    postData.append("sponsor", form.sponsor);

    await fetch("http://127.0.0.1:8000/api/program/update/" + editId, {
      method: "post",
      body: postData,
    })
      .then((response) => response.json())
      .then((result) => {
        pData.splice(index, 1, result.data);
        newItems[index] = result.data;
        setView({ edit: false, add: false });
        resetForm();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          title: item.title,
          hours: item.hours,
          ld: item.ld,
          from: item.from,
          to: item.to,
          sponsor: item.sponsor,
          cover: item.cover,
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
              <BlockTitle>Training Programs</BlockTitle>
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
                      <span>Title of L&D Program</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Number of Hours</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Type </span>
                    </DataTableRow>
                    {/* <DataTableRow size="md">
                      <span>Monthly Salary</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>Salary</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>Status of appointment</span>
                    </DataTableRow> */}
                    {/* <DataTableRow size="md">
                      <span>Government Service</span>
                    </DataTableRow> */}
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
                                <Link to={`${process.env.PUBLIC_URL}/program/${item.id}`}>
                                  <span className="title">{item.faculty.attr.full_name}</span>
                                </Link>
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.title}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.hours}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.ld}</span>
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
                            {/* <DataTableRow size="md">
                              <span className="tb-sub">{item.govt ? "Yes" : "No"}</span>
                            </DataTableRow> */}
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
                      Title of L&D interventions
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.title}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Number of hours
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="hours"
                        // onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.hours}
                      />
                      {errors.hours && <span className="invalid">{errors.hours.message}</span>}
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
                      Type of LD
                    </label>
                    <div className="form-control-wrap">
                      <select
                        name="ld"
                        className="form-control"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.ld}
                      >
                        <option value="managerial">Managerial</option>
                        <option value="supervisory">Supervisory</option>
                        <option value="technical">Technical</option>
                      </select>
                      {errors.ld && <span className="invalid">{errors.ld.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Coverage
                    </label>
                    <div className="form-control-wrap">
                      <select
                        name="cover"
                        className="form-control"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.cover}
                      >
                        <option value="international">International</option>
                        <option value="national">National</option>
                        <option value="regional">Regional</option>
                        <option value="local">Local</option>
                      </select>
                      {errors.cover && <span className="invalid">{errors.cover.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Conducted By
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="sponsor"
                        ref={register({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.sponsor}
                      />
                      {errors.sponsor && <span className="invalid">{errors.sponsor.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label className="form-label">Certificate Image</label>
                    <div className="form-control-wrap">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          name="cert"
                          ref={register({ required: "This is required" })}
                          onChange={(e) => setDefaultFiles(e.target.files[0])}
                        />
                        <label className="custom-file-label" htmlFor="customFile">
                          {!defaultFiles ? "Choose files" : defaultFiles.name}
                        </label>
                      </div>
                    </div>
                    {errors.cert && <span className="invalid">{errors.cert.message}</span>}
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
              <BlockDes>{/* <p>Work Experience.</p> */}</BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit2(onEditSubmit)}>
              <Row className="g-3">
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Title of L&D interventions
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.title}
                      />
                      {errors2.title && <span className="invalid">{errors2.title.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Number of hours
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="hours"
                        // onChange={(e) => onInputChange(e)}
                        ref={register2({
                          required: "This field is required",
                        })}
                        defaultValue={formData.hours}
                      />
                      {errors2.hours && <span className="invalid">{errors2.hours.message}</span>}
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
                      Type of LD
                    </label>
                    <div className="form-control-wrap">
                      <select
                        name="ld"
                        className="form-control"
                        ref={register2({ required: "This is required" })}
                        defaultValue={formData.ld}
                      >
                        <option value="managerial" selected={formData.ld == "managerial" ? true : false}>
                          Managerial
                        </option>
                        <option value="supervisory" selected={formData.ld == "supervisory" ? true : false}>
                          Supervisory
                        </option>
                        <option value="technical" selected={formData.ld == "technical" ? true : false}>
                          Technical
                        </option>
                      </select>
                      {errors2.ld && <span className="invalid">{errors2.ld.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Coverage
                    </label>
                    <div className="form-control-wrap">
                      <select
                        name="cover"
                        className="form-control"
                        ref={register2({ required: "This is required" })}
                        defaultValue={formData.cover}
                      >
                        <option value="international" selected={formData.cover == "international" ? true : false}>
                          International
                        </option>
                        <option value="national" selected={formData.cover == "national" ? true : false}>
                          National
                        </option>
                        <option value="regional" selected={formData.cover == "regional" ? true : false}>
                          Regional
                        </option>
                        <option value="local" selected={formData.cover == "local" ? true : false}>
                          Local
                        </option>
                      </select>
                      {errors2.cover && <span className="invalid">{errors2.cover.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Conducted By
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="sponsor"
                        ref={register2({ required: "This is required" })}
                        // onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.sponsor}
                      />
                      {errors2.sponsor && <span className="invalid">{errors2.sponsor.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label className="form-label">Certificate Image</label>
                    <div className="form-control-wrap">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          name="cert"
                          ref={register2()}
                          onChange={(e) => setDefaultFiles2(e.target.files[0])}
                        />
                        <label className="custom-file-label" htmlFor="customFile">
                          {!defaultFiles2 ? "Choose files" : defaultFiles2.name}
                        </label>
                      </div>
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

export default PList;
