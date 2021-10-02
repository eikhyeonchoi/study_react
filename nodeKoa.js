/**
 * Koa
 * koa 어플리케이션은 미들웨어의 배열로 구성되어있다
 * app.use를 통해 미들웨어 함수를 어플리케이션에 등록함
 */

/**
 * 미들웨어 함수의 구조
 * (ctx, next) => {
 *      두개의 파라미터를 받음 
 *      ctx: Context의 줄임말로 웹 요청과 응답에 관한 정보를 지니고 있다 
 *      next: next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수
 *            next를 호출하지 않는다면 다음 미들웨어를 호출하지 않는다
 *            next함수의 반환 값은 Promise를 반환한다, 이 Promise는 다음에 처리해야 할 미들웨어가 끝나야 완료됨
 * }
 */


/**
 * Koa에서의 라우팅(npm i koa-router)
 */ 
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/', ctx => {
    ctx.body = 'home';
});

router.get('/about/:name?', ctx => {
    console.log(ctx.params);
    const {name} = ctx.params;
    ctx.body = name ? `${name} about` : 'about';
});

router.get('/posts', ctx => {
    console.log(ctx.query);
    const {id} = ctx.query;
    ctx.body = id ? `${id} post` : 'post';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port 4000');
});