import * as React from "react";
import * as _ from "lodash";

import {
    SearchkitManager, SearchkitProvider,
    SearchBox, RefinementListFilter, MenuFilter, RangeFilter,
    Hits, HitsStats, NoHits, Pagination, SortingSelector,
    SelectedFilters, ResetFilters, ItemHistogramList,
    Layout, LayoutBody, LayoutResults, TopBar, ItemCheckboxList, TagCloud,
    SideBar, ActionBar, ActionBarRow, InputFilter, PageSizeSelector, Toggle,
    Tabs, ItemList, CheckboxItemList, DynamicRangeFilter, ViewSwitcherToggle, ViewSwitcherHits
} from "searchkit";

require("./index.scss");

const host = "http://www-explorer.pthor.ch/elastic/";
//const host = "http://localhost:9200/all_products_spryker_read";
const searchkit = new SearchkitManager(host);


const ProductHitsGridItem = (props)=> {
    const {bemBlocks, result} = props;
    if (result) {
        let url = "https://siroop.ch" + result._source.de_CH.url;
        const source:any = _.extend({}, result._source, result.highlight);
        let sku = source.sku;

        let isActiveClassName = source.is_active ? "view-active-product" : "view-notactive-product";
        let isActiveText = source.is_active ? "Active" : "Not Active";

        return (
            <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
                <div className={bemBlocks.item("details")}>
                    <a href={url} target="_blank">
                        <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.images.lowres} width="170" height="170"/>

                        <div data-qa="title" className={bemBlocks.item("title")}
                             dangerouslySetInnerHTML={{__html:source.de_CH.name}}>
                        </div>
                        <div className={bemBlocks.item("title")}>SKU: {sku}</div>
                        <div className={bemBlocks.item("title").mix(isActiveClassName)}>{isActiveText}</div>
                    </a>
                </div>
            </div>
        )
    }
};


export const ProductHitsListItem = (props)=> {
    const {bemBlocks, result} = props;
    if (result) {
        let url = "https://siroop.ch" + result._source.de_CH.url;
        const source:any = _.extend({}, result._source, result.highlight);

        //let name = result._source.de_CH.name;
        let de_CH = result._source.de_CH;

        let categories_path = de_CH.categories.path;
        let brand = source.brand_name;
        let merchants = _.join(_.map(source.merchants, function(el) {return _.at(el, 'name');}), ", ");
        let isActive = source.is_active;
        let sku = source.sku;

        return (
            <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
                <div className={bemBlocks.item("poster")}>
                    <img data-qa="poster" src={result._source.images.lowres} width="170" height="170"/>
                </div>
                <div className={bemBlocks.item("details")}>
                    <h3 className={bemBlocks.item("subtitle")}>{source.de_CH.short_description}</h3>
                    <div className={bemBlocks.item("text")}>SKU: {sku}</div>
                    <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:source.de_CH.long_description}}></div>
                    <div className={bemBlocks.item("text")}>Brand: {brand}</div>
                    <div className={bemBlocks.item("text")}>Merchants: {merchants}</div>
                    <div className={bemBlocks.item("text")}>Active: {isActive}</div>
                </div>
            </div>
        )
    }
};

// JSON Span
//
//<div className={bemBlocks.item("details")}>
//    <a href={url} target="_blank"><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.de_CH.name}}></h2></a>
//    <JSONSpan pretty={true} data={source}></JSONSpan>
//</div>

export interface IAppProductsProps {
}
//
// export default class AppProducts extends React.Component<IAppProductsProps, any> {
//
// 	render() {
// 		return (
// 		<div className="home">
// 			<div className="home__splash">
// 				<div className="splash-promo">
// 					<div className="splash-promo__title">UI components for Elasticsearch</div>
// 					<div className="splash-promo__blurb">The easiest way to build a great search experience with Elasticsearch.</div>
// 					<div className="splash-promo__example-site">
// 						  <AppProducts/>
// 					</div>
// 				</div>
// 			</div>
//     </div>
// 		);
// 	}
// }
//


export default class AppProducts extends React.Component<IAppProductsProps, any> {
    render() {
        return (
            <SearchkitProvider searchkit={searchkit}>
                <Layout>
                        <SearchBox
                            autofocus={true}
                            searchOnChange={true}
                            placeholder="Search documents..."
                            prefixQueryFields={["de_CH.name"]}/>
                    <LayoutBody>
                        <SideBar>
                            <RangeFilter
                                id="min_price"
                                field="min_price"
                                min={0}
                                max={50000}
                                showHistogram={true}
                                title="Price"/>
                            <RefinementListFilter
                                id="de_CH.attributes.tags"
                                title="TagCloud"
                                field="de_CH.attributes.tags.raw"
                                operator="OR"
                                listComponent={TagCloud}
                                size={10}/>
                            <MenuFilter
                                id="isactive"
                                title="Active Products"
                                field="is_active"
                                operator="OR"
                                listComponent={CheckboxItemList}
                                translations={{
                                    "All":"All Products",
                                    "0": "Inactive",
                                    "1": "Active"
                                }}
                                size={2}/>
                            <RefinementListFilter
                                id="de_CH.categories.name"
                                title="Categories"
                                field="de_CH.categories.name.raw"
                                operator="OR"
                                listComponent={ItemHistogramList}
                                size={7}/>
                            <RefinementListFilter
                                id="de_CH.parent_categories.name"
                                title="Parent Categories"
                                field="de_CH.parent_categories.name.raw"
                                operator="OR"
                                listComponent={ItemHistogramList}
                                size={7}/>
                            <MenuFilter
                                id="merchants.name"
                                title="Merchant Name"
                                field="merchants.name.raw"
                                operator="OR"
                                listComponent={ItemHistogramList}
                                size={7}/>
                            <MenuFilter
                                id="brand_name"
                                title="Brand Name"
                                field="brand_name.raw"
                                operator="OR"
                                listComponent={ItemHistogramList}
                                size={7}/>
                        </SideBar>
                        <LayoutResults>
                            <ActionBar>
                                <ActionBarRow>
                                    <HitsStats/>
                                    <ViewSwitcherToggle/>
                                    <SortingSelector listComponent={Toggle} options={[
										{label:"Relevance", field:"_score", order:"desc", defaultOption:true},
										{label:"Latest Products", field:"created_at", order:"desc"},
										{label:"Oldest Products", field:"created_at", order:"asc"},
										{label:"Cheapest", field:"min_price", order:"asc"},
										{label:"Most expensive", field:"min_price", order:"desc"}
									]}/>
                                </ActionBarRow>
                                <ActionBarRow>
                                    <SelectedFilters/>
                                    <ResetFilters/>
                                </ActionBarRow>
                            </ActionBar>
                            <ViewSwitcherHits
                                hitsPerPage={50} highlightFields={["title","plot"]}
                                hitComponents={[
                                    {key:"grid", title:"Grid", itemComponent:ProductHitsGridItem, defaultOption:true},
                                    {key:"list", title:"List", itemComponent:ProductHitsListItem}
                                ]}
                                scrollTo="body" />
                            <NoHits/>
                            <Pagination showNumbers={true}/>
                        </LayoutResults>
                    </LayoutBody>
                </Layout>
            </SearchkitProvider>
        )
    }
}

