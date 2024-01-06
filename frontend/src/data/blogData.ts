import { IBlog } from "@/section/BlogsSection";

interface IImg {
    src: string;
    alt: string;
}


interface IPageHero {
    name: string;
    content: {bgImg: IImg, title: string;}
}

interface ISearch {
    name: string;
    content: string;
}

interface IImgListContent {
    img: IImg;
    link: string;
    title: string;
    desc?: string;
    alignImg?: string;
};

interface IImgList {
    name: string;
    title: string;
    path: 'posts' | 'products';
    content: IImgListContent[];
}

interface IImgLink {
    name: string;
    content: {img: IImg; link: {path: string; target: string;}}
}

interface IBlogList {
    name: string;
    content: IBlog[]
}


interface IBlogData {
    sections: Array<IPageHero |  ISearch | IImgList| IImgLink| IBlogList>;
}


export const blogData = {
    sections: [
        {
            name: "pageHero",
            content: {
                bgImg: {
                    src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
                    alt: 'page hero'
                },
                title: 'Blogs'
            }
        },
        {
            name: "searchForm",
            content: "Search form goes here."
        },
        {
            name: "imgList",
            title: "Other options available",
            path: "posts",
            content: [
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                },
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                },
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                },
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                },
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                },
              ],
        },
        {
            name: "imgList",
            title: "Products",
            path: "products",
            content: [
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                    desc: "$7.00 per bag",
                    alignImg: "right"
                },
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                    desc: "$7.00 per bag",
                    alignImg: "right"
                },
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                    desc: "$7.00 per bag",
                    alignImg: "right"
                },
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                    desc: "$7.00 per bag",
                    alignImg: "right"
                },
                {
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
                        alt: "winter lawn"
                    },
                    link: "/blogs/indf",
                    title: "Quick Winter Lawn Care Tips",
                    desc: "$7.00 per bag",
                    alignImg: "right"
                },
              ],
        },
        {
            name: "imgLink",
            content: {
                img: {
                    src: "https://theturfman.com.au/wp-content/uploads/2020/10/commercial-turf-theturfman.jpeg",
                    alt: "best-commercial-lawn"
                },
                link: {
                    path: "/contact",
                    target: "_blank"
                }
            }
        },
        {
            name: "blogList",
            content: [
                {
                    id: "343dfdfuhd",
                    title: 'Quick Winter Lawn Care Tips',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
                        alt: "winter lawn",
                    },
                    category: 'turf',
                    link: "/blogs/lawn-tips",
                    comments: 0,
                    date: "07 Jun, 2022",
                    author: "turfman",
                },
                {
                    id: "3434snadd394",
                    title: 'Tips to Pet Friendly Lawn',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
                        alt: "Dog",
                    },
                    category: 'turf',
                    link: "/blogs/lawn-tips",
                    comments: 10,
                    date: "30 Apr, 2022",
                    author: "turfman",
                },
                {
                    id: "343903hd030",
                    title: 'Benefits of Fertilising Your Lawn',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
                        alt: "Grass",
                    },
                    category: 'uncategorized',
                    link: "/blogs/lawn-tips",
                    comments: 11,
                    date: "08 Feb, 2022",
                    author: "turfman",
                },
                {
                    id: "343dfdfuhd",
                    title: 'Quick Winter Lawn Care Tips',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
                        alt: "winter lawn",
                    },
                    category: 'turf',
                    link: "/blogs/lawn-tips",
                    comments: 0,
                    date: "07 Jun, 2022",
                    author: "turfman",
                },
                {
                    id: "3434snadd394",
                    title: 'Tips to Pet Friendly Lawn',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
                        alt: "Dog",
                    },
                    category: 'turf',
                    link: "/blogs/lawn-tips",
                    comments: 10,
                    date: "30 Apr, 2022",
                    author: "turfman",
                },
                {
                    id: "343903hd030",
                    title: 'Benefits of Fertilising Your Lawn',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
                        alt: "Grass",
                    },
                    category: 'uncategorized',
                    link: "/blogs/lawn-tips",
                    comments: 11,
                    date: "08 Feb, 2022",
                    author: "turfman",
                },
                {
                    id: "343dfdfuhd",
                    title: 'Quick Winter Lawn Care Tips',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
                        alt: "winter lawn",
                    },
                    category: 'turf',
                    link: "/blogs/lawn-tips",
                    comments: 0,
                    date: "07 Jun, 2022",
                    author: "turfman",
                },
                {
                    id: "3434snadd394",
                    title: 'Tips to Pet Friendly Lawn',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
                        alt: "Dog",
                    },
                    category: 'turf',
                    link: "/blogs/lawn-tips",
                    comments: 10,
                    date: "30 Apr, 2022",
                    author: "turfman",
                },
                {
                    id: "343903hd030",
                    title: 'Benefits of Fertilising Your Lawn',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
                        alt: "Grass",
                    },
                    category: 'uncategorized',
                    link: "/blogs/lawn-tips",
                    comments: 11,
                    date: "08 Feb, 2022",
                    author: "turfman",
                },
                {
                    id: "343dfdfuhd",
                    title: 'Quick Winter Lawn Care Tips',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
                        alt: "winter lawn",
                    },
                    category: 'turf',
                    link: "/blogs/lawn-tips",
                    comments: 0,
                    date: "07 Jun, 2022",
                    author: "turfman",
                },
                {
                    id: "3434snadd394",
                    title: 'Tips to Pet Friendly Lawn',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
                        alt: "Dog",
                    },
                    category: 'turf',
                    link: "/blogs/lawn-tips",
                    comments: 10,
                    date: "30 Apr, 2022",
                    author: "turfman",
                },
                {
                    id: "343903hd030",
                    title: 'Benefits of Fertilising Your Lawn',
                    img: {
                        src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
                        alt: "Grass",
                    },
                    category: 'uncategorized',
                    link: "/blogs/lawn-tips",
                    comments: 11,
                    date: "08 Feb, 2022",
                    author: "turfman",
                },
            ]
        }
    ]
}