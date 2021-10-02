/**
 * node 함수 정리
 * var express = require('express');
 * var app = express();
 */

/**
 * app.METHOD(PATH, HANDLER)
 * METHOD: HTTP 요청 메서드(get, post, delete, put)
 * PATH: 라우트 경로
 * HANDLER: 실행 될 콜백 함수
 * 
 * ex.
 * app.get('/', (req, res) => {
 *      console.log('hello world')
 * });
 */



/**
 * app.use(PATH, ROUTER);
 * PATH: 일치 요청 경로
 * ROUTER: 사용될 라우터
 * 
 * ex. 정적파일 렌더링
 * 만약 이렇게 경로가 겹친다면
 * 위에 선언된게 우선권을 가진다
 * app.use('/', express.static('public'));
 * app.get('/', (req, res) => {
 * });
 * 
 * ex.
 * var user = require('./routes/user');
 * app.use('/user', user);
 * 
 * 라우터 작성법
 */
var routerExpress = require('express');
var router = routerExpress.Router();
router.get('/:id', (req, res) => {
    console.log(JSON.stringify(req.params));
});
module.exports = router;



/**
 * 미들웨어란? (콜백함수)
 * 요청오브젝트(req), 응답오브젝트(res) 그리고 어플리케이션의 요청-응답 주기 중
 * 그 다음의 미들웨어 함수 대한 액세스 권한을 갖는 함수이다
 * << HTTP 요청 -> [[미들웨어]] -> 라우팅 -> HTTP 요청응답 >> 
 */
var middleware = app.use((req, res, next) => {
    // 여기서의 req, res는 요청 및 응답 오브젝트이며
    // next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수
    // next함수를 호출하지 않는다면 그 다음 미들웨어를 처리 하지 않음
});