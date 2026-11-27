import project1 from 'assets/project/projectXcel.png'
import project2 from 'assets/project/react-native.png'
import taskflowImg from 'assets/project/taskflow.svg'
import browserServiceImg from 'assets/project/browser-service.svg'
import ssoDemoImg from 'assets/project/sso-demo.svg'
import medicalBookingImg from 'assets/project/medical-booking.svg'
import stateMgmtImg from 'assets/project/state-management.svg'
import nextBlogImg from 'assets/project/next-blog.svg'
import taskApiImg from 'assets/project/task-management-api.svg'
import chiaTienImg from 'assets/project/chia-tien.svg'
import binhChonImg from 'assets/project/binh-chon.svg'
import linkGonImg from 'assets/project/link-gon.svg'

export interface IExperienceItem {
  id: number
  title: {
    vi: string
    en: string
  }
  company: {
    vi: string
    en: string
  }
  duration: {
    vi: string
    en: string
  }
  location?: {
    vi: string
    en: string
  }
  description?: {
    vi: string[]
    en: string[]
  }
  skills?: string[]
}

export const EXPERIENCES: IExperienceItem[] = [
  {
    id: 3,
    title: {
      vi: 'Kỹ Sư Fullstack Developer',
      en: 'Fullstack Developer'
    },
    company: {
      vi: 'CÔNG TY TNHH ĐẦU TƯ TOÀN CẦU IVCOM',
      en: 'IVCOM GLOBAL INVESTMENT CO., LTD'
    },
    duration: {
      vi: '10/2023 - Hiện tại',
      en: '10/2023 - Present'
    },
    location: {
      vi: 'Hồ Chí Minh, Việt Nam',
      en: 'Ho Chi Minh City, Vietnam'
    },
    description: {
      vi: [
        'Chịu trách nhiệm kiến trúc và phát triển hệ sinh thái ứng dụng web và nền tảng dịch vụ cho khách hàng doanh nghiệp.',
        'Xây dựng các module microservices hiệu năng cao với NestJS, Node.js và tích hợp hệ thống cơ sở dữ liệu MongoDB, MySQL.',
        'Tối ưu hóa giao diện người dùng với React, Next.js và TypeScript giúp tăng tốc độ tải trang lên 45%.'
      ],
      en: [
        'Architected and delivered scalable web applications and enterprise-grade software solutions.',
        'Built high-performance microservices using NestJS, Node.js, and integrated MongoDB & MySQL databases.',
        'Optimized frontend performance using React, Next.js, and TypeScript, boosting page load speeds by 45%.'
      ]
    },
    skills: ['React', 'Next.js', 'NestJS', 'TypeScript', 'MongoDB', 'Docker', 'TailwindCSS']
  },
  {
    id: 2,
    title: {
      vi: 'Lập Trình Viên Fullstack Web',
      en: 'Fullstack Web Developer'
    },
    company: {
      vi: 'CÔNG TY GIẢI PHÁP PHẦN MỀM BLACKWIND',
      en: 'Blackwind Software Solutions'
    },
    duration: {
      vi: '02/2023 - 06/2023',
      en: '02/2023 - 06/2023'
    },
    location: {
      vi: 'Hồ Chí Minh, Việt Nam',
      en: 'Ho Chi Minh City, Vietnam'
    },
    description: {
      vi: [
        'Phát triển các module thương mại điện tử và cổng quản trị số liệu phân tích thời gian thực.',
        'Thiết kế API RESTful chuẩn OpenAPI và xây dựng giao diện người dùng tương thích đa màn hình.',
        'Cải thiện hiệu năng truy vấn database và giảm 30% thời gian phản hồi API.'
      ],
      en: [
        'Developed e-commerce modules and real-time analytical dashboard solutions.',
        'Designed RESTful APIs conforming to OpenAPI standards and crafted pixel-perfect responsive UIs.',
        'Optimized database queries and reduced API latency by 30%.'
      ]
    },
    skills: ['React', 'JavaScript', 'Node.js', 'Express', 'MySQL', 'Bootstrap', 'Git']
  },
  {
    id: 1,
    title: {
      vi: 'Kỹ Sư Phần Mềm & Phát Triển Web',
      en: 'Software & Web Developer'
    },
    company: {
      vi: 'CÔNG TY PHẦN MỀM VÀ GIẢI PHÁP KIM TỰ THÁP',
      en: 'Pyramid Software & Consulting Ltd'
    },
    duration: {
      vi: '2019 - 2023',
      en: '2019 - 2023'
    },
    location: {
      vi: 'Hồ Chí Minh, Việt Nam',
      en: 'Ho Chi Minh City, Vietnam'
    },
    description: {
      vi: [
        'Tham gia phát triển các dự án Outsourcing quốc tế quy mô vừa và lớn với các đối tác Nhật Bản và Singapore.',
        'Xây dựng các giao diện SPA phức tạp, dashboard quản lý và tích hợp luồng xác thực OAuth2.',
        'Viết unit tests và tuân thủ quy trình CI/CD, Scrum/Agile linh hoạt.'
      ],
      en: [
        'Contributed to large-scale international outsourcing projects for clients in Japan and Singapore.',
        'Engineered complex SPA interfaces, admin portals, and secure OAuth2 authentication flows.',
        'Wrote automated unit tests and adhered to agile Scrum practices and CI/CD pipelines.'
      ]
    },
    skills: ['React', 'TypeScript', 'Redux', 'HTML/CSS', 'SQL', 'REST API', 'Agile/Scrum']
  }
]

// export const CV_LINK = 'https://drive.google.com/file/d/1GcWrg0EzjCvtzq4ySH6ir882OHTFVUuh/view?usp=sharing'
export const CV_LINK = ''

export const EDUCATIONS = [
  {
    id: 1,
    title: {
      vi: 'Kỹ Sư Công Nghệ Thông Tin (Cử nhân)',
      en: 'Bachelor of Information Technology Engineering'
    },
    company: {
      vi: 'Trường Đại học Công Nghiệp TP. Hồ Chí Minh (IUH)',
      en: 'Industrial University of Ho Chi Minh City (IUH)'
    },
    duration: {
      vi: '2017 - 2022',
      en: '2017 - 2022'
    },
    major: {
      vi: 'Chuyên ngành Kỹ thuật Phần mềm & Hệ thống thông tin',
      en: 'Major in Software Engineering & Information Systems'
    }
  },
  {
    id: 2,
    title: {
      vi: 'Học Sinh Chuyên Toán - Tin',
      en: 'High School Diploma (Math & CS Focus)'
    },
    company: {
      vi: 'Trường THPT Chuyên Nguyễn Đình Chiểu',
      en: 'Nguyen Dinh Chieu High School for the Gifted'
    },
    duration: {
      vi: '2014 - 2017',
      en: '2014 - 2017'
    },
    major: {
      vi: 'Khối Chuyên Tự Nhiên & Nền tảng Khoa học Máy tính',
      en: 'Advanced Natural Sciences & Computer Science Foundations'
    }
  }
]

export const STATS_DATA = [
  {
    id: 1,
    number: '4+',
    label: {
      vi: 'Năm kinh nghiệm',
      en: 'Years Experience'
    }
  },
  {
    id: 2,
    number: '15+',
    label: {
      vi: 'Dự án hoàn thành',
      en: 'Projects Completed'
    }
  },
  {
    id: 3,
    number: '100%',
    label: {
      vi: 'Cam kết chất lượng',
      en: 'Client Satisfaction'
    }
  },
  {
    id: 4,
    number: '14+',
    label: {
      vi: 'Công nghệ thành thạo',
      en: 'Tech Mastered'
    }
  }
]

export const SKILLS_DATA = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next',
  'NestJS',
  'Bootstrap',
  'Tailwind',
  'MaterialUI',
  'SQL',
  'MySQL',
  'MongoDB',
  'Git'
]

export const SKILL_CATEGORIES = [
  {
    category: {
      vi: 'Frontend Development',
      en: 'Frontend Development'
    },
    skills: ['React', 'Next', 'TypeScript', 'JavaScript', 'Tailwind', 'Bootstrap', 'MaterialUI', 'HTML', 'CSS']
  },
  {
    category: {
      vi: 'Backend & Database',
      en: 'Backend & Database'
    },
    skills: ['NestJS', 'MySQL', 'MongoDB', 'SQL']
  },
  {
    category: {
      vi: 'Tools & Workflow',
      en: 'Tools & Workflow'
    },
    skills: ['Git', 'TypeScript', 'Next', 'React']
  }
]

type TI18n<T = string> = { vi: T; en: T }

// Required: slug, title, description, tags, imgPath. Everything else is optional and hidden when absent.
export interface IProjectItem {
  id: number
  slug: string
  imgPath: string
  title: string
  category: 'Fullstack' | 'Frontend' | 'Mobile' | 'Backend'
  githubLink?: string
  demoLink?: string
  privateSource?: boolean
  featured?: boolean
  tags: string[]
  description: TI18n
  period?: string
  role?: TI18n
  overview?: TI18n
  features?: TI18n<string[]>
  outcomes?: TI18n<string[]>
  screenshots?: string[]
}

export interface ITestimonial {
  id: number
  name: string
  role: TI18n
  relation: 'teammate' | 'manager' | 'client' | 'mentor'
  quote: TI18n
  avatar?: string
  link?: string
}

// Only real quotes with permission. Empty → the section and its palette entry stay hidden.
export const TESTIMONIALS: ITestimonial[] = []

export const PROJECTS: IProjectItem[] = [
  {
    id: 1,
    slug: 'xcel-edtech',
    imgPath: project1,
    title: 'Xcel.vn - EdTech Platform',
    category: 'Fullstack',
    featured: true,
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS'],
    demoLink: 'https://xcel.vn/',
    description: {
      vi: 'Nền tảng đào tạo trực tuyến chuyên sâu về phân tích dữ liệu, tự động hóa với Excel và Google Sheets. Cung cấp hệ thống học tập video chất lượng cao, bài tập tương tác, quản lý tiến độ học viên, hệ thống Q&A trực tiếp và cấp chứng chỉ số.',
      en: 'Specialized online education platform for data analytics and spreadsheet automation. Features interactive video courses, automated quizzes, learner progress tracking, live Q&A sessions, and verifiable digital certificate generation.'
    }
  },
  {
    id: 11,
    slug: 'chia-tien',
    imgPath: chiaTienImg,
    title: 'Chia Tiền - Group Expense Splitter',
    category: 'Fullstack',
    featured: true,
    period: '2026',
    tags: ['Next.js', 'React', 'TypeScript', 'Server Actions', 'PostgreSQL', 'Neon', 'Vercel'],
    githubLink: 'https://github.com/AnhHuynh1999/chia-tien',
    demoLink: 'https://chia-tien-taupe.vercel.app',
    description: {
      vi: 'Ứng dụng chia chi phí nhóm: ghi ai đã trả gì, tự tính số dư từng người và gợi ý cách thanh toán với ít lượt chuyển khoản nhất. Không cần tài khoản — chia sẻ nhóm bằng link.',
      en: 'Group expense splitter: log who paid what, get each member’s balance and the fewest transfers needed to settle up. No sign-up — groups are shared by link.'
    },
    role: {
      vi: 'Tự lên ý tưởng, thiết kế, phát triển và triển khai',
      en: 'Solo — idea, design, development and deployment'
    },
    overview: {
      vi: 'Đi chơi chung thì ai cũng ứng tiền, cuối chuyến không ai muốn ngồi tính. Chia Tiền biến việc đó thành vài cú chạm: nhập khoản chi, app tự cân sổ và chỉ ra danh sách chuyển khoản gọn nhất để cả nhóm về 0.',
      en: 'On group trips everyone fronts money and nobody wants to do the math at the end. Chia Tiền turns it into a few taps: log expenses, and the app balances the books and lists the fewest transfers that bring everyone to zero.'
    },
    features: {
      vi: [
        'Thuật toán greedy gợi ý thanh toán với tối đa n−1 giao dịch, có unit test',
        'Chia đều theo số nguyên VND không lệch đồng nào; nhập nhanh kiểu 150k, 1.5tr',
        'Server Actions + SQL thuần với CTE để ghi khoản chi và phần chia trong một câu lệnh',
        'Neon Postgres khi deploy, PGlite (Postgres WASM) khi chạy local — không cần cài database',
        'Nhóm mẫu để xem thử ngay, nhớ nhóm gần đây, link nhóm không bị index, giao diện sáng/tối'
      ],
      en: [
        'Greedy settlement algorithm with at most n−1 transfers, unit tested',
        'Exact integer VND equal splits; quick input like 150k or 1.5tr',
        'Server Actions with plain SQL CTEs writing an expense and its shares in one statement',
        'Neon Postgres in production, PGlite (Postgres in WASM) locally — no database install',
        'One-click demo group, recent groups, non-indexed group links, light/dark UI'
      ]
    }
  },
  {
    id: 12,
    slug: 'binh-chon',
    imgPath: binhChonImg,
    title: 'Bình Chọn - Live Polls',
    category: 'Fullstack',
    period: '2026',
    tags: ['Next.js', 'React', 'TypeScript', 'Route Handlers', 'PostgreSQL', 'Neon', 'Vercel Cron'],
    githubLink: 'https://github.com/AnhHuynh1999/binh-chon',
    demoLink: 'https://binh-chon-phi.vercel.app',
    description: {
      vi: 'Bình chọn trực tiếp cho lớp học và buổi họp: chiếu mã 6 ký tự hoặc QR, khán giả bình chọn bằng điện thoại, kết quả cập nhật trên mọi màn hình trong khoảng 2 giây. Không cần tài khoản.',
      en: 'Live polls for classrooms and meetings: show a 6-character code or QR, the audience votes from their phones and results update on every screen within about 2 seconds. No sign-up.'
    },
    role: {
      vi: 'Tự lên ý tưởng, thiết kế, phát triển và triển khai',
      en: 'Solo — idea, design, development and deployment'
    },
    overview: {
      vi: 'Bài toán chính là “realtime” trên hạ tầng serverless không giữ được WebSocket. Bình Chọn giải bằng polling nhẹ theo trạng thái hiển thị của tab, còn tính đúng của phiếu bầu được đảm bảo ở tầng database thay vì ở code ứng dụng.',
      en: 'The core problem is “real-time” on serverless hosting that cannot hold WebSockets. Bình Chọn uses lightweight, visibility-aware polling, and guarantees vote correctness in the database rather than in application code.'
    },
    features: {
      vi: [
        'Màn hình trình chiếu với mã lớn, QR và kết quả trực tiếp; đóng/mở bình chọn',
        'Mỗi trình duyệt một phiếu nhờ khóa chính (poll, voter) — 50 phiếu gửi đồng thời được đếm đủ 50, có script kiểm thử tải',
        'Kiểm tra trạng thái mở và ghi phiếu trong cùng một câu SQL, tránh race condition',
        'Kết quả trực tiếp mỗi 1,5 giây, tạm dừng khi tab ẩn để tiết kiệm request',
        'Vercel Cron tự xóa bình chọn không hoạt động sau 90 ngày; unit test cho logic'
      ],
      en: [
        'Presenter screen with a large join code, QR and live results; open/close voting',
        'One vote per browser enforced by a (poll, voter) primary key — 50 concurrent votes count exactly 50, with a load-test script',
        'Open-state check and vote insert in a single SQL statement to avoid race conditions',
        'Live results every 1.5 s, paused while the tab is hidden to save requests',
        'Vercel Cron removes polls inactive for 90 days; unit-tested core logic'
      ]
    }
  },
  {
    id: 13,
    slug: 'link-gon',
    imgPath: linkGonImg,
    title: 'Link Gọn - Link Shortener & Analytics',
    category: 'Fullstack',
    period: '2026',
    tags: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Neon', 'SVG Charts', 'Vercel Cron'],
    githubLink: 'https://github.com/AnhHuynh1999/link-gon',
    demoLink: 'https://link-gon.vercel.app',
    description: {
      vi: 'Rút gọn link có thống kê: lượt bấm theo ngày, nguồn truy cập, thiết bị và quốc gia trên trang thống kê riêng tư. Tự lọc lượt xem trước của Facebook, Zalo, Telegram để số liệu là người thật.',
      en: 'Link shortener with analytics: clicks per day, referrers, devices and countries on a private stats page. Facebook, Zalo and Telegram link previews are filtered out so numbers reflect real people.'
    },
    role: {
      vi: 'Tự lên ý tưởng, thiết kế, phát triển và triển khai',
      en: 'Solo — idea, design, development and deployment'
    },
    overview: {
      vi: 'Dịch vụ rút gọn link công khai rất dễ bị dùng để giấu link lừa đảo, và số liệu thường bị thổi phồng bởi bot. Link Gọn hiện tên trang đích trước khi chuyển hướng, lọc bot khi ghi nhận và chỉ lưu dữ liệu tối thiểu (không lưu IP).',
      en: 'Public shorteners are easily abused to hide phishing links, and their numbers get inflated by bots. Link Gọn shows the destination before redirecting, filters bots at record time and stores minimal data (no IP addresses).'
    },
    features: {
      vi: [
        'Trang trung gian chống lừa đảo: hiện tên miền đích, tự chuyển sau 3 giây',
        'Nhận diện bot/bản xem trước qua user-agent, loại khỏi số liệu và hiện số lượt đã lọc',
        'Biểu đồ 30 ngày và top nguồn/thiết bị/quốc gia vẽ bằng SVG thuần, có bảng ẩn cho trình đọc màn hình',
        'Tên link tùy chọn, kiểm tra URL (chặn javascript:, link tự trỏ), giới hạn 10 link/giờ bằng IP đã băm',
        'Vercel Cron xóa link không có lượt bấm sau 90 ngày; unit test cho logic'
      ],
      en: [
        'Anti-phishing interstitial showing the destination domain, auto-continuing after 3 seconds',
        'User-agent bot/preview detection, excluded from stats with a filtered count shown',
        '30-day chart and top referrers/devices/countries drawn in plain SVG, with a screen-reader table',
        'Custom aliases, URL validation (blocks javascript:, self links), 10 links/hour limit via hashed IP',
        'Vercel Cron removes links without clicks for 90 days; unit-tested core logic'
      ]
    }
  },
  {
    id: 4,
    slug: 'taskflow',
    imgPath: taskflowImg,
    title: 'TaskFlow - Kanban Task Manager',
    category: 'Fullstack',
    featured: true,
    period: '2026',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'TailwindCSS'],
    githubLink: 'https://github.com/AnhHuynh1999/taskflow',
    demoLink: 'https://taskflow-ashy-zeta.vercel.app/',
    description: {
      vi: 'Ứng dụng quản lý công việc fullstack với bảng Kanban kéo-thả (To Do / In Progress / Done), đăng ký/đăng nhập bằng JWT. Thứ tự và trạng thái công việc được lưu xuống MongoDB ngay khi kéo thả.',
      en: 'Fullstack task manager with a drag-and-drop Kanban board (To Do / In Progress / Done) and JWT authentication. Task order and status persist to MongoDB as soon as a card is dropped.'
    },
    role: {
      vi: 'Tự thiết kế và phát triển toàn bộ (frontend, backend, triển khai)',
      en: 'Solo — designed and built frontend, backend and deployment'
    },
    overview: {
      vi: 'Dự án được xây dựng như một sản phẩm thật, có thể triển khai, không phải bản sao từ hướng dẫn. Frontend Next.js 14 (App Router, TypeScript) gọi API Express tách biệt; mọi endpoint công việc đều được bảo vệ bằng JWT.',
      en: 'Built as a clean, real, deployable product rather than a tutorial clone. A Next.js 14 frontend (App Router, TypeScript) talks to a separate Express API; every task endpoint is protected by JWT.'
    },
    features: {
      vi: [
        'Đăng ký / đăng nhập bằng email + mật khẩu (JWT, mật khẩu băm bằng bcrypt)',
        'Tạo, xóa và kéo-thả công việc giữa các cột To Do / In Progress / Done',
        'Lưu thứ tự và trạng thái qua endpoint sắp xếp hàng loạt, cập nhật giao diện lạc quan khi kéo',
        'API được bảo vệ: mọi endpoint công việc yêu cầu JWT hợp lệ',
        'Frontend định kiểu đầy đủ, tách bạch API client, auth context và UI component'
      ],
      en: [
        'Register / log in with email + password (JWT, passwords hashed with bcrypt)',
        'Create, delete and drag tasks between To Do / In Progress / Done columns',
        'Order and status persisted through a bulk reorder endpoint, with optimistic UI updates on drag',
        'Protected API: every task endpoint requires a valid JWT',
        'Fully typed frontend with a clean split between API client, auth context and UI components'
      ]
    }
  },
  {
    id: 2,
    slug: 'mobile-app-ecosystem',
    imgPath: project2,
    title: 'Mobile App Ecosystem (React Native)',
    category: 'Mobile',
    featured: true,
    tags: ['React Native', 'TypeScript', 'Redux Toolkit', 'Rest API', 'Firebase'],
    description: {
      vi: 'Ứng dụng di động đa nền tảng (iOS & Android) cung cấp trải nghiệm mượt mà với tính năng thông báo thời gian thực, quản lý giỏ hàng, định vị bản đồ và thanh toán ví điện tử tích hợp an toàn.',
      en: 'Cross-platform mobile application (iOS & Android) offering fluid animations, real-time push notifications, location-based services, cart management, and seamless secure mobile payment integration.'
    }
  },
  {
    id: 3,
    slug: 'enterprise-cloud-hub',
    imgPath: project1,
    title: 'Enterprise Management Cloud Hub',
    category: 'Fullstack',
    featured: false,
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'TailwindCSS'],
    description: {
      vi: 'Hệ thống quản lý nội bộ doanh nghiệp bao gồm CRM, theo dõi tiến độ công việc Kanban theo thời gian thực, phân quyền chi tiết RBAC và báo cáo thống kê trực quan hoá dạng biểu đồ tương tác.',
      en: 'Enterprise SaaS cloud solution encompassing CRM, real-time Kanban workflow board, granular RBAC permissions, and comprehensive dynamic analytical dashboards with data export.'
    }
  },
  {
    id: 5,
    slug: 'headless-browser-service',
    imgPath: browserServiceImg,
    title: 'Headless Browser Service',
    category: 'Backend',
    period: '2026',
    tags: ['Node.js', 'Express', 'Playwright', 'Docker', 'n8n', 'Render'],
    githubLink: 'https://github.com/AnhHuynh1999/playwright-html-fetcher',
    description: {
      vi: 'Dịch vụ HTTP chạy trình duyệt headless (Playwright + Chromium stealth) để lấy HTML của các trang render bằng JavaScript, phục vụ workflow tự động hóa n8n. Đóng gói Docker, triển khai trên Render.',
      en: 'Headless-browser HTTP service (Playwright + stealth Chromium) that returns the HTML of JavaScript-rendered pages for n8n automation workflows. Dockerized and deployed on Render.'
    },
    role: {
      vi: 'Tự thiết kế, phát triển và triển khai',
      en: 'Solo — designed, built and deployed'
    },
    features: {
      vi: [
        'Endpoint POST /fetch-html trả về HTML đã render, có tùy chỉnh thời gian chờ',
        'Xác thực bằng header x-auth-token; /health mở cho nền tảng kiểm tra',
        'Playwright + stealth plugin để vượt các trang có JS-challenge',
        'Hướng dẫn kiến trúc n8n trên VPS ↔ dịch vụ trên Render, xử lý cold start của gói Free'
      ],
      en: [
        'POST /fetch-html endpoint returning rendered HTML with a configurable timeout',
        'x-auth-token header auth; open /health endpoint for platform checks',
        'Playwright + stealth plugin to get through JS-challenge pages',
        'Documented n8n-on-VPS ↔ Render architecture, including free-plan cold-start handling'
      ]
    }
  },
  {
    id: 6,
    slug: 'sso-jwt-demo',
    imgPath: ssoDemoImg,
    title: 'Single Sign-On with JWT',
    category: 'Fullstack',
    period: '2023',
    tags: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'Node.js',
      'Express',
      'Passport',
      'JWT',
      'MySQL',
      'Sequelize',
      'Docker'
    ],
    githubLink: 'https://github.com/AnhHuynh1999/SSO_Demo',
    description: {
      vi: 'Hệ thống đăng nhập một lần (SSO): một máy chủ xác thực Node.js/Express cấp JWT dùng chung cho nhiều ứng dụng React, hỗ trợ đăng nhập Google.',
      en: 'Single Sign-On system: a Node.js/Express auth server issues JWTs shared across multiple React apps, with Google login support.'
    },
    features: {
      vi: [
        'Máy chủ xác thực với Passport (local), session lưu bằng Sequelize, mật khẩu băm bcrypt',
        'Cấp và kiểm tra JWT dùng chung giữa các ứng dụng',
        'Hai client React (JavaScript và TypeScript) với Redux Toolkit, React Hook Form',
        'Đăng nhập Google, MySQL + Sequelize migration, đóng gói Docker'
      ],
      en: [
        'Auth server with Passport (local strategy), Sequelize-backed sessions, bcrypt-hashed passwords',
        'Issues and verifies JWTs shared between apps',
        'Two React clients (JavaScript and TypeScript) using Redux Toolkit and React Hook Form',
        'Google login, MySQL + Sequelize migrations, Dockerized backend'
      ]
    }
  },
  {
    id: 7,
    slug: 'medical-booking',
    imgPath: medicalBookingImg,
    title: 'Medical Appointment Booking',
    category: 'Fullstack',
    period: '2023',
    tags: ['React', 'Redux', 'React Intl', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'Docker'],
    githubLink: 'https://github.com/AnhHuynh1999/fullstackReactjsNodejs',
    description: {
      vi: 'Ứng dụng đặt lịch khám bệnh: bệnh nhân xem chuyên khoa, cơ sở y tế, bác sĩ và đặt lịch theo khung giờ; trang quản trị cho admin và bác sĩ.',
      en: 'Medical appointment booking app: patients browse specialties, clinics and doctors and book time slots; admin and doctor dashboards.'
    },
    features: {
      vi: [
        'Trang chủ với chuyên khoa, cơ sở y tế, bác sĩ nổi bật và cẩm nang',
        'Bác sĩ tạo lịch khám theo khung giờ, bệnh nhân đặt lịch trực tuyến',
        'Admin quản lý người dùng, bác sĩ, phòng khám; soạn giới thiệu bằng Markdown',
        'Đa ngôn ngữ Việt/Anh (React Intl), Redux persist, REST API Express + Sequelize/MySQL'
      ],
      en: [
        'Home page with specialties, clinics, featured doctors and handbook',
        'Doctors publish time-slot schedules; patients book online',
        'Admin manages users, doctors and clinics; Markdown editor for profiles',
        'Vietnamese/English UI (React Intl), Redux persist, Express REST API with Sequelize/MySQL'
      ]
    }
  },
  {
    id: 8,
    slug: 'state-management-lab',
    imgPath: stateMgmtImg,
    title: 'React State Management Lab',
    category: 'Frontend',
    period: '2025',
    tags: ['React', 'TypeScript', 'Vite', 'Redux Toolkit', 'Redux-Saga', 'React Query', 'json-server'],
    githubLink: 'https://github.com/AnhHuynh1999/state-management',
    description: {
      vi: 'Bộ ví dụ so sánh các cách quản lý state trong React — Redux Toolkit, Redux-Saga và React Query — trên cùng một bài toán CRUD với backend giả lập json-server.',
      en: 'Side-by-side React state management examples — Redux Toolkit, Redux-Saga and React Query — solving the same CRUD problem against a json-server mock backend.'
    },
    features: {
      vi: [
        'Cùng một giao diện CRUD người dùng/bài viết viết lại bằng từng thư viện',
        'Redux-Saga xử lý side effect bằng generator, React Query cache và refetch tự động',
        'Backend giả lập bằng json-server để tập trung vào phía client'
      ],
      en: [
        'The same users/posts CRUD UI rebuilt with each library',
        'Redux-Saga for generator-based side effects; React Query for caching and auto refetch',
        'json-server mock backend to keep the focus on the client'
      ]
    }
  },
  {
    id: 9,
    slug: 'nextjs-blog-crud',
    imgPath: nextBlogImg,
    title: 'Next.js 13 Blog CRUD',
    category: 'Frontend',
    period: '2023',
    tags: ['Next.js', 'React', 'TypeScript', 'SWR', 'React Bootstrap'],
    githubLink: 'https://github.com/AnhHuynh1999/Next13',
    description: {
      vi: 'Ứng dụng quản lý blog với Next.js 13 App Router: danh sách, xem chi tiết, thêm/sửa/xóa bài viết, lấy dữ liệu bằng SWR.',
      en: 'Blog management app on the Next.js 13 App Router: list, detail, create/edit/delete posts, data fetching with SWR.'
    },
    features: {
      vi: [
        'App Router với layout lồng nhau và route động /blogs/[id]',
        'Bảng bài viết với modal thêm/sửa, thông báo bằng React Toastify',
        'SWR để fetch và revalidate dữ liệu phía client'
      ],
      en: [
        'App Router with nested layouts and dynamic /blogs/[id] route',
        'Posts table with create/edit modals and React Toastify notifications',
        'SWR for client-side fetching and revalidation'
      ]
    }
  },
  {
    id: 10,
    slug: 'task-management-api',
    imgPath: taskApiImg,
    title: 'Project & Task Management API',
    category: 'Backend',
    period: '2021',
    tags: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'JWT', 'ASP.NET Identity'],
    githubLink: 'https://github.com/AnhHuynh1999/ThucTap/tree/BaoAnh',
    description: {
      vi: 'Web API quản lý dự án và công việc (dự án thực tập): đăng nhập JWT, phân quyền theo vai trò, kiến trúc nhiều tầng với Entity Framework Core và SQL Server.',
      en: 'Project and task management Web API (internship project): JWT login, role-based authorization, layered architecture with Entity Framework Core and SQL Server.'
    },
    role: {
      vi: 'Thực tập sinh, làm việc nhóm 2 người',
      en: 'Intern, two-person team'
    },
    features: {
      vi: [
        'Đăng ký/đăng nhập với ASP.NET Identity, cấp JWT kèm claim vai trò',
        'API CRUD cho dự án, công việc, người dùng và trạng thái công việc',
        'Tách tầng Controllers → Service (BO) → DataAccess (DAL) → Models',
        'Entity Framework Core code-first migration trên SQL Server'
      ],
      en: [
        'Register/login with ASP.NET Identity, JWT issued with role claims',
        'CRUD APIs for projects, tasks, users and task status',
        'Layered design: Controllers → Service (BO) → DataAccess (DAL) → Models',
        'Entity Framework Core code-first migrations on SQL Server'
      ]
    }
  }
]

export const APP_DATA = {
  NAME: 'Bảo Anh IT',
  ROLE: 'Fullstack Developer',
  EMAIL: 'huynhbaoanh1011@gmail.com',
  PHONE: '+84 708 405 127',
  LOCATION: 'Dong Thap / Ho Chi Minh City, Vietnam',
  YOUTUBE_URL: 'https://www.youtube.com/@anhhuynh1153',
  TIKTOK_URL: 'https://www.tiktok.com/@anhhuynh101199',
  INSTAGRAM_URL: 'https://www.instagram.com/anhhuynhhhhhh/?next=%2F',
  FACEBOOK_URL: 'https://www.facebook.com/anhhuynh1011/',
  GITHUB_URL: 'https://github.com/AnhHuynh1999',
  TELEGRAM_URL: 'https://t.me/anhhuynh1999'
}
