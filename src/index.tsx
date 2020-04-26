import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';


const Index = () => {

    // 相关hook
    const {useState, useEffect} = React;

    // 状态
    const [[activeAbout, activeIntro], setActive] = useState([false, false]); // 关于、介绍菜单激活
    const [isShowDesc, setShowDesc] = useState(false); // 移动端菜单显示icon
    const [display, setDispaly] = useState('none'); // 移动端菜单显示icon
    const [pageNum, setPageNum] = useState(1); // 页码
    const [offsetTop, setOffsetTop] = useState('0'); // 页码

    // 表格数据
    const menuList: Array<{ title: string, content: string, href: string }> = [
        {
            title: 'hope`s Blog',
            content: '个人博客,写写记记,做一个进击的coder',
            href: 'http://blog.xiaodoudou.xin/'
        }, {
            title: '爱生活，爱音乐',
            content: '还记得犬夜叉里《穿越时空的思念》吗?',
            href: 'doudou/index.html'
        }, {
            title: '新的旅途',
            content: 'You can either travel or read,but either your body or soul must be on the way。仅仅作为留念',
            href: './app/html/travel/index.html'
        }, {
            title: '随笔',
            content: '小时候听大人说写日记是为以后怀念过去的',
            href: 'https://blog.xiaodoudou.xin/categories/%E9%9A%8F%E7%AC%94/'
        }, {
            title: '小作品',
            content: '有时并不知道自己这么能创造',
            href: './app/html/production/index.html'
        }
    ];

    useEffect(() => {
        const screenWidth = document.documentElement.clientWidth;
        if (screenWidth < 980) {
            setDispaly('none')
            // 移动端禁止滚动页面
            document.documentElement.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
            document.querySelector('.center-content').addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false)
        } else {
            setDispaly('block');
        }
    }, []);

    /**
     * 函数
     */
    const toggleDesc = (): void => {
        // 切换介绍菜单显示隐藏
        const headerEle: Element = document.querySelector('.header-visible');
        const display: string = getComputedStyle(headerEle).display;
        setDispaly(prevState => {
            return prevState === 'none' ? 'block' : 'none';
        });

        // 显示时默认显示关于项， 关闭是触发两项隐藏
        if (display === 'none') {
            setActive([true, false]);
        } else {
            setActive([false, false]);
        }

        // 切换按钮显示
        setShowDesc(prevState => !prevState);
    }

    /**
     * 切换标签显示
     * @param type
     */
    const show = (type: number): void => {
        setActive(prevState => {
            return [type === 0 && !prevState[0], type !== 0 && !prevState[1]];
        })
    }

    const nextPage = (e: any): void => {
        e.preventDefault();
        // 获取第一个a page页，根据偏移量设置其绝对位置，下面的元素会自动上下移
        var item1 = document.querySelector('.center-content');
        // 计算偏移量，pageNum从1开始，所以偏移量是- pageNum * 100%,
        // 当pageNum === $scope.menuList.length时，返回第一页，即偏移量回复0
        var offsetY = pageNum === menuList.length ? 0 : -pageNum * 100;
        setOffsetTop(offsetY + '%');
        // 更改pageNum
        setPageNum(prevState => {
            return prevState === menuList.length ? 1 : ++prevState
        });
    }

    return (
        <div className="main-page-content">
            <div className="info-toggle" onClick={() => toggleDesc()}>
                {
                    !isShowDesc && <i className="iconfont">&#xe65c;</i>
                }
                {
                    isShowDesc && <i className="iconfont">&#xe60a;</i>
                }
            </div>
            <div className="header header-visible" style={{display: display}}>
                <div className="info-desc">
                    <div className="header_title">
                        <h2>兜兜转换</h2>
                        <div className="intro_link">
                            <span className={activeAbout ? 'active-show' : ''}
                                  onClick={() => show(0)}>About
                            </span>
                            <span>|</span>
                            <span className={activeIntro ? 'active-show' : ''}
                                  onClick={() => show(1)}>Introduction
                            </span>
                        </div>
                    </div>
                    {
                        activeAbout &&
                        <div className="about_page">
                            <h3>欢迎来到兜兜转换</h3>
                            <p>
                                我是进击中的Coder：hope<br/>我仅仅是喜欢自己突发奇想的小东西（包括你现在看到的这个网页），移动、PC端均可查看。
                                这里也是我进(学)击(习)的地方，有相关资料整理、笔记等，如果你觉得有用，可以随意拿去看看，如果有问题，还麻烦指出错误哦
                            </p>
                        </div>
                    }
                    {
                        activeIntro &&
                        <div className="intro_page">
                            <h3>你可以使用下面方式联系我</h3>
                            <p>
                                如果你在这里看到了我笔记中的问题，或者你也有喜欢的小作品想推荐给我的，都可以联系我<br/>
                                <strong><i className="iconfont">&#xe65d;</i><a
                                    href="mailto:zhang121923@sina.com">:zhang121923@sina.com</a></strong><br/>
                                <strong><i className="iconfont">&#xe7e7;</i>:935300065</strong><br/>
                            </p>
                        </div>
                    }
                </div>
            </div>
            <div className="center">
                <div className="global-title">
                    <h2>兜兜转换</h2>
                </div>
                <div className="center-content" style={{top: offsetTop}}>
                    {
                        menuList.map((item, index) => (
                            <a className={"page-item kind-item-" + (index + 1)}
                               key={index}
                               href={item.href} target="_blank"
                            >
                                <div className={'item item-' + (index + 1)}>
                                    <h3 className="title">{item.title}</h3>
                                    <p className="content">{item.content}</p>
                                </div>
                            </a>
                        ))
                    }
                </div>
                <div onClick={(event) => nextPage(event)} className="next-area">
                    <i className="iconfont">&#xe826;</i>
                    <span className="next-area-desc">点此区域查看下一项</span>
                </div>
            </div>
            {
                (activeAbout || activeIntro) &&
                <div className="masking"></div>
            }
        </div>
    )
};

ReactDOM.render(<Index/>, document.querySelector('.main-page'));
