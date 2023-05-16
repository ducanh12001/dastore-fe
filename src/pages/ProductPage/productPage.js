import React, { useState, useEffect } from "react";
import styles from "./productPage.css";
import {
    Breadcrumb,
    Button,
    Checkbox,
    Col,
    Drawer,
    Input,
    Layout,
    Row,
    Select,
    Tree,
    Typography,
} from 'antd';
import productApi from "../../apis/productApi";
import { useHistory } from 'react-router-dom';
import triangleTopRight from "../../assets/icon/Triangle-Top-Right.svg"
import { numberWithCommas } from "../../utils/common";
import { CaretDownOutlined } from '@ant-design/icons';
import PaginationComponent from "./pagination";
const { Search } = Input;

const { Option } = Select;

const { Sider } = Layout;

const { Paragraph, Text } = Typography;

const ProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [productList, setProductList] = useState([]);
    const [eventListHome, setEventListHome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 12,
        totalItems: 1,
        totalPages: 1,
    });

    const history = useHistory();

    useEffect(() => {
        (async () => {

            try {
                const response = await productApi.getListEvents(1, 6)
                setEventListHome(response.data)
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
            try {
                const response = await productApi.getCategory({ limit: 10, page: 1 });
                setCategories(response.data.docs);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const response = await productApi.getListProducts({ page: pagination.pageNumber, limit: pagination.pageSize })
                setProductList(response.data.docs);
                setPagination({
                    pageNumber: response.data.page,
                    pageSize: 12,
                    totalItems: response.data.totalDocs,
                    totalPages: response.data.totalPages,
                  });
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [pagination.pageNumber])

    const handleReadMore = (id) => {
        history.push("product-detail/" + id)
    }

    const onSearch = async (name) => {
        try {
            const res = await productApi.searchProduct(name);
            setProductList(res.data.docs);
            console.log(res)
        } catch (error) {
            console.log('search to fetch category list:' + error);
        }
    }

    const onCheck = () => {

    }

    const handlePriceTo = (e) => {
        setPriceTo(parseFloat(e.target.value));
      };
    
      const handlePriceFrom = (e) => {
        setPriceFrom(parseFloat(e.target.value));
      };

    const onClickReset = () => {

    }

    const onClickFilter = () => {

    }

    const handleChangePageNumber = (pageNumber, pageSize) => {
        setPagination({
            ...pagination,
            pageNumber: pageNumber,
        });
    }

    return (
        <>
            <Row className='wrapper'>
                <Col
                    xxl={{ span: 4 }}
                    xl={{ span: 5 }}
                    lg={{ span: 6 }}
                    md={{ span: 8 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                    className='menu-filter'
                >
                    <Layout hasSider style={{ minHeight: '100vh' }}>
                        <Sider trigger={null}>
                            <div className='title-fast-filter-menu'>
                                <span>BỘ LỌC TÌM KIẾM</span>
                            </div>
                            <div className='fast-filter-menu'>
                                <Paragraph className='title-filter-group'>
                                    Theo danh mục
                                </Paragraph>
                                {categories &&
                                    <ul className="menu-tree">
                                        {categories.map((category) => (
                                            <li key={category.id}>
                                                <div className="menu-category">
                                                    {category.name}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>}
                            </div>

                            <div className='fast-filter-menu-2'>
                                <Paragraph className='title-filter-group'>
                                    Giá
                                </Paragraph>
                                <Input.Group className='search-price' compact>
                                    <Input
                                        className='input-price-min'
                                        // addonBefore="đ"
                                        placeholder='Từ'
                                        type="number"
                                        min={0}
                                        max={1000000000}
                                        step={100}
                                        value={priceFrom}
                                        onChange={(val) => handlePriceFrom(val)}
                                        onKeyPress={(event) => {
                                            if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,10}$/)) {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                return false;
                                            }
                                        }}
                                        size={'large'}
                                    />
                                    <Input
                                        className='site-input-split'
                                        placeholder="~"
                                        disabled
                                    />
                                    <Input
                                        className='input-price-max'
                                        // addonBefore="đ"
                                        placeholder='Đến'
                                        type="number"
                                        min={0}
                                        max={1000000000}
                                        step={100}
                                        value={priceTo}
                                        onChange={(val) => handlePriceTo(val)}
                                        onKeyPress={(event) => {
                                            if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,10}$/)) {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                return false;
                                            }
                                        }}
                                        size={'large'}
                                    />
                                </Input.Group>
                            </div>

                            <div className='fast-filter-menu'>
                                <Row className='wrapper-action-btn'>
                                    <Col span={11}>
                                        <Button
                                            className='refresh-filter-btn'
                                            onClick={onClickReset}
                                        >
                                            Refresh
                                        </Button>
                                    </Col>

                                    <Col span={11}>
                                        <Button
                                            className='apply-filter-btn'
                                            onClick={onClickFilter}
                                        >
                                            Lọc
                                        </Button>
                                    </Col>
                                </Row>
                            </div>

                        </Sider>
                    </Layout>
                </Col>

                <Col
                    xxl={{ span: 20 }}
                    xl={{ span: 19 }}
                    lg={{ span: 18 }}
                    md={{ span: 16 }}
                    sm={{ span: 24 }}
                    className='header1'
                >
                    <Row gutter={[8, 8]} className="header-search">
                        <Col
                            sm={{ span: 16 }}
                            xs={{ span: 24 }}
                        >
                            <Search
                                placeholder='Tìm kiếm'
                                allowClear
                                onSearch={onSearch}
                                enterButton
                                className='style-search'
                                prefix=" "
                            />
                        </Col>
                    </Row>

                    <div className='list-products2'>
                        <Row className='row-product' gutter={[32, 8]}>
                            {productList.map((item) => (
                                <Col
                                    xxl={{ span: 6 }}
                                    xl={{ span: 6 }}
                                    lg={{ span: 12 }}
                                    md={{ span: 12 }}
                                    sm={{ span: 12 }}
                                    xs={{ span: 24 }}
                                    className='col-product'
                                    onClick={() => handleReadMore(item._id)}
                                    key={item.id}
                                >
                                    <div>
                                        {item.image ? (
                                            <img
                                                className='image-product'
                                                src={item.image}
                                            />
                                        ) : (
                                            <img
                                                className='image-product'
                                                src={require('../../assets/image/NoImageAvailable.jpg')}
                                            />
                                        )}
                                        <div className='wrapper-products'>
                                            <Paragraph
                                                className='title-product'
                                                ellipsis={{ rows: 2 }}
                                            >
                                                {item.name}
                                            </Paragraph>
                                            <div className="price-amount">
                                                <Paragraph className='price-product'>
                                                    {numberWithCommas(item.price - item.promotion)} đ
                                                </Paragraph>
                                                {item.promotion !== 0 &&
                                                    <Paragraph className='price-cross'>
                                                        {numberWithCommas(item.price)} đ
                                                    </Paragraph>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {item.promotion !== 0 &&
                                        <Paragraph className='badge' style={{ position: 'absolute', top: 10, left: 9 }}>
                                            <span>Giảm giá</span>
                                            <img src={triangleTopRight} />
                                        </Paragraph>
                                    }
                                </Col>
                            ))}
                        </Row>
                        <Row className="style-pagination">
                            <PaginationComponent
                                pagination={pagination}
                                handleChangePagination={handleChangePageNumber}
                                isShowSize={false}
                            />
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default ProductPage;