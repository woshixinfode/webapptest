/************************************CMS***********************************************/
import http from './request'
// 获取token值  此处为固定账号登录
export const login = data => http.post('/api/authorizations', data)
// 获取用户信息   固定web_id: 1
export const getuserInfo = () => http.get('/api/user')
//获取图形验证码

export const getModulStyle = data => http.post('/cms/web/channel_list', data)
// 获取网站所拥有的模板 固定web_id: 1
export const getWebModels = data => http.post('/cms/web', Data(data))

//读取网页底部信息
export const getFooterInfo=data => http.post('/cms/web/service/show',data)

// 获取模块信息
export const getModuleInfo = (data, query) => http.post('/cms/module', Data(data), null, { params: query })
// 获取某类别下资源



//获取分类id封面
export const getCategoryNode = data => http.post('/source/category/getNodesInfo',data)





/***********************************Source*************************************************/
export const getResource = (data, type, page) => {
    var type = type ? type : 1
    var page = page ? page : 1
    return http.post('/source/cms/search/?search_type=' + type + '&page=' + page, Data(data))
};
//POST/api/noValidation/getInfo  获取页面title

export const getdoctitle =(data) =>http.post('/source/noValidation/getInfo',data)
//获取分类子节点
export const getSpecialNode = (data) => http.get('/source/category/getNodes', null, { params: data })
//获取组内资源
export const getGroup = (data) => http.get('/source/cms/groupInfoCms', null, { params: data })
// 获取收藏夹列表
export const getFavoriteList = data => http.get('/source/favorite/folderList', null, { params: data });
//添加收藏夹列表内资源
export const getFavoriteItem = data => http.get('/source/favorite/ItemList', null, { params: data });
// 更新收藏夹
export const updateFavorite = data => http.patch('/source/favorite/folderUpdate', data)
// 添加收藏夹
export const addFavorite = data => http.post('/source/favorite/add', data)
// 收藏夹删除
export const deleteFavorite = data => http.delete('/source/favorite/folderDelete', null, { params: data })
//删除收藏夹内容
export const deleteFavoriteContent = data => http.delete('/source/favorite/itemDelete', null, { params: data })
//移动收藏夹内容
export const MoveFavorite = data => http.post('/source/favorite/itemMove', data)
// 个人中心获取下载记录
export const getDowLog = data => http.get('/source/record/userDownload', null, { params: data })
// 收藏夹添加资源
export const addFavoriteAsset = data => http.post('/source/favorite/addResource', data)
// 单一下载
export const onlyDownload = data => http.get('/source/download/single', null, {params: data})
//打包下载
export const allDownload = data => http.get('/source/download/pack', null, {params: data})
//供稿人作品上传
export const contributorSend = (data,option) => http.post('/source/upload/photographer',data,null,option);
//获取客户信息
export const getcontributor = (data,option) => http.post('/source/noValidation/getInfo',data,null,option);

export const resetPasswordbymobile = data=>http.post('./api/user/ReSetPasswordBySms',data)




/****************************************api************************************************/

//根据域名获取webid
export const getwebid = data => http.post('/cms/getCustom/byUrl', data)

// /api/category/resource/all  展示分类管理  获取整个分类树
export const newtitle =data =>http.get('/source/category/resource/all',null,data)

//api/upload/direct/preSigned
export const getDirectInfo =data =>http.get('/source/upload/direct/preSigned',null,data)

// category/list  资源库分类管理  获取资源库分类树
export const newtitle1 = data =>http.get('source/category/list',null,data)


// http://60.205.57.44:3000/mock/11/api/user/ReSetPasswordByEmail

export const resetPassword = data=>http.post('./api/user/ReSetPasswordByEmail',data)
// 用户登录验证
export const userLogin = data => http.post('/api/authorizations', data)
// 获取用户登录信息
export const getUserInfo = option => http.get('/api/user', null, option)
// 更改用户信息
export const updateUserInfo = data => http.patch('/api/user', data)
// 更改密码
export const updatePassword = data => http.post('/api/user/reset_password', data)
// 退出登录
export const signOut = data => http.get('/api/user/logout')
// 用户注册
export const registerUser = (data) =>http.post('/api/user/register',data);
//供稿人申请
/**
 * 供稿人申请
 * @param {*} data --供稿人申请
 * @param {*} option
 */
export const  contributorUser= (data,option) => http.post('/api/user/photographer_reg',data,null,option);
// 获取图形验证码
export const getImgCode = () => http.get('/api/captchaInfo/1')
// 发送验证码到邮箱

export const sendCode = data => http.post(`/api/sendMailCode/${data.type}/${data.uuid}`,data);

//  发送短信验证码 http://60.205.57.44:3000/mock/11/api/sendSmsCode/{type}/{uuid}

export const sendSmsCode = data =>http.post(`/api/sendSmsCode/${data.type}/${data.uuid}`,data);



/*********************************************************************************************/
// 请求blob
export const getImageBlob = url => http.get(url, undefined, { responseType: 'blob', withCredentials: false })




export const saveUploadingAsset =(data,option) =>http.post('/source/upload/direct/saveAssets',data,null,option)

//直传保存视频资源
export const saveUploadingAsset_ =(data,option)=>http.post('/source/upload/direct/saveAssets_',data,null,option)

/**
 * 判断用户是否有效
 * @param {object} data  --判断用户是否有效
 */
export const checkAccount = data=>http.post('/api/user/checkAccount',data)

function Data(data) {
    var val = '';
    for (let key in data) {
        val += key + '=' + data[key] + '&'
    }
    return val
}


/*添加发布接口+++++++*/

export const saveGroup = data =>http.post('/api/upload/direct/saveGroup',data)

/**
 * {
	"group_title": "1",                             //组标题       *
	"group_caption":"中国",                         //组说明
	"group_keywords": "",                           //组关键词
	"sort_str": "79,87,184",                        //组资源分类 多个分类以父子关系逗号分隔        *
	"sort_name": "Y-2",                             //组资源分类节点名称路径，父子关系分号相隔     *
	"asset_type":1,                                 //组类型1图片3视频                             *
    "group_index":5022986,                              //组封面1为指定该资源为组的封面                *
	"items":[
		{
			"asset_id": 5022986,                          //资源ID                                       *
            "location": "北京",                     //地点
            "credit_line": "李四",                  //摄影师
            "shoot_time": "2018-09-21 08:43:47",    //拍摄时间
            "keywords": "",                         //资源关键词
            "copyright": 3,                         //1独家代理，2非独家代理，3自有版权
            "caption": "",                          //资源说明
            "signature": null,                      //署名
            "people": null,                        //人物关键词
            "country_id":"" ,                     //国家ID
            "province_id":"",                    //省份id
            "city_id":"",                       //城市ID
              "limited":"",                     //限制信息
		}
	]
}
 *
 * */
