import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Link,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import Table from '@mui/joy/Table';
import profileImage from '../../assets/profileImage.jpg';
import KAKAO_SVG from '../../assets/KakaoTalk_logo.svg.png';
import GAMIL_SVG from '../../assets/Gmail_icon.svg.png';
import LINKEDIN_SVG from '../../assets/LinkedIn_icon.svg.png';
import JS_SVG from '../../assets/Javascript_badge.svg.png';
import TS_SVG from '../../assets/Typescript_logo_2020.svg.png';
import VueJS_SVG from '../../assets/Vue.js_Logo_2.svg.png';
import NestJS_SVG from '../../assets/NestJS.svg.png';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { registry } from '@common/registry';
import { useState } from 'react';

export const Home = () => {
  const { uiService } = registry;
  const [openExinnoDialog, setExinnoDialog] = useState(false);

  return (
    <Box>
      <section id="intro">
        <Typography variant="h4" gutterBottom>
          Intro
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: uiService.isMobile ? 'wrap' : 'nowrap', justifyContent: 'center' }}>
          <Avatar src={profileImage} sx={{ width: 250, height: 250 }} />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <b>Simple is the best | 단순함을 추구하는 웹 개발자</b>
            </Typography>
            <Typography variant="body1">
              Vuejs & TypeScript 기반의 4년차 개발자 <b>채형국</b> 입니다. <br /> 로우코드 플랫폼 풀스택 개발 및 연구
              경험이 있으며 현재 프론트엔드 메인으로 전체적인 웹서비스에 대한 구현이 가능합니다.
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardActions>
            <IconButton onClick={() => uiService.notify('cogudrnr9@gmail.com')}>
              <img width={'40px'} src={GAMIL_SVG}></img>
            </IconButton>
            <IconButton onClick={() => window.open('https://www.linkedin.com/in/hyeoungguk-chae-927929224/')}>
              <img width={'40px'} src={LINKEDIN_SVG}></img>
            </IconButton>
            <IconButton onClick={() => window.open('https://open.kakao.com/o/sRzOIhsf')}>
              <img width={'40px'} src={KAKAO_SVG}></img>
            </IconButton>
          </CardActions>
        </Box>
      </section>
      <br />
      <section id="EXPERIENCE">
        <Typography variant="h4" gutterBottom>
          EXPERIENCE
        </Typography>
      </section>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '40%' }}>회사</TableCell>
              <TableCell style={{ width: '40%' }}>업무</TableCell>
              <TableCell>세부 내용</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6">익스이노</Typography>
                <Typography variant="caption">
                  <Link href="https://www.exinno.net/" target="_blank">
                    https://www.exinno.net/
                  </Link>
                </Typography>
                <Typography>연구원</Typography>
                <Typography>2020년 5월 - 2023년 1월</Typography>
              </TableCell>
              <TableCell>
                <Typography>1. 사내 솔루션 로우코드 플랫폼 개발</Typography>
                <Typography>2. 효성첨단소재 사내 스마트 플랫폼 개발</Typography>
                <Typography>3. 호텔신라 사내 문서중앙화 웹 서비스 리뉴얼</Typography>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => setExinnoDialog(true)}>
                  <TextSnippetIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ whiteSpace: 'break-spaces', wordWrap: 'break-word' }}>
                  <Typography variant="h6">더존비즈온</Typography>
                  <Typography variant="caption">
                    <Link href="https://www.douzone.com/main/index.jsp" target="_blank">
                      https://www.douzone.com/main/index.jsp
                    </Link>
                  </Typography>
                  <Typography>연구원</Typography>
                  <Typography>2019년 10월 - 2020년 1월</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography>1. Wehago 시스템 React 기반의 프로젝트로 마이그레이션</Typography>
                <Typography>2. Wehago 서비스 메뉴 개발.</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <section id="SKILL">
        <Typography variant="h4" gutterBottom>
          SKILL
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>기술</TableCell>
                <TableCell style={{ width: '10%' }}>-</TableCell>
                <TableCell style={{ width: '60%' }}>사용 경험</TableCell>
                <TableCell>사용 기간</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h6">Javascript</Typography>
                </TableCell>
                <TableCell>
                  <img width={'40px'} src={JS_SVG}></img>
                </TableCell>
                <TableCell>
                  <Typography>
                    ES6문법이 활발하게 적용될때 배워 이후 버젼도 꾸준히 공부하여 적용하고 있습니다. 반응형 웹사이트 등을
                    만들며 활용하고 있습니다.
                  </Typography>
                </TableCell>
                <TableCell>4 Years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h6">Typescript</Typography>
                </TableCell>
                <TableCell>
                  <img width={'40px'} src={TS_SVG}></img>
                </TableCell>
                <TableCell>
                  <Typography>
                    타입 안정을 통해 개발 생산성과 유지보수성이 높아진 것을 실감하여 이후 진행하는 프로젝트 대부분에
                    적용하고 있습니다.
                  </Typography>
                </TableCell>
                <TableCell>2 Years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h6">VueJs</Typography>
                </TableCell>
                <TableCell>
                  <img width={'40px'} src={VueJS_SVG}></img>
                </TableCell>
                <TableCell>
                  <Typography>
                    Vue2 부터 Vue3까지 기업 솔루션에 최적화되고 구조가 안정적이며 유지보수가 쉬운 Vuejs에 매료되어
                    현재까지 사용하고 있습니다.
                  </Typography>
                </TableCell>
                <TableCell>4 Years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h6">NestJs</Typography>
                </TableCell>
                <TableCell>
                  <img width={'40px'} src={NestJS_SVG}></img>
                </TableCell>
                <TableCell>
                  <Typography>Javscript계의 Spring과 같은 MVC 패턴의 정석적인 백엔드 프레임워크입니다.</Typography>
                </TableCell>
                <TableCell>2 Years</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      {
        <Dialog fullScreen={uiService.isMobile} open={openExinnoDialog}>
          <DialogTitle>{'익스이노'}</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
              <Typography variant="h6">What I learn</Typography>
              <Typography variant="body2">1. Vue, Typescript 기반의 깔끔한 로우코드 플랫폼 개발 경험</Typography>
              <Typography variant="body2">2. 객체지향 클린코드 개발 경험</Typography>
              <br />
              <Typography variant="h6">What I used</Typography>
              <Typography variant="body2">Vue.js, Typescript, NestJS, Quasar Framework</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setExinnoDialog(false);
              }}
            >
              close
            </Button>
          </DialogActions>
        </Dialog>
      }
    </Box>
  );
};
