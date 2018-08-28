const navList = [
    {title: '推荐', type: 'recommend'},
    {title: '新闻', type: 'news'},
    {title: '预告片', type: 'preview'},
    {title: '时光号', type: 'mtime'},
    {title: '影评', type: 'comment'},
    {title: '票房', type: 'gross'}
];

const obj2style = style => {
    let str = [];
    Object.keys(style).forEach(key => {
        str.push(`${key}:${style[key]}`)
    })
    return str.join(';')
}
export {
    navList,
    obj2style
}
