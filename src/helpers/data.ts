import project1 from 'assets/project/projectXcel.png'
import project2 from 'assets/project/react-native.png'

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

export const CV_LINK = 'https://drive.google.com/file/d/1GcWrg0EzjCvtzq4ySH6ir882OHTFVUuh/view?usp=sharing'

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

export interface IProjectItem {
  id: number
  imgPath: string
  title: string
  category: 'Fullstack' | 'Frontend' | 'Mobile' | 'Backend'
  githubLink: string
  demoLink: string
  featured?: boolean
  tags: string[]
  description: {
    vi: string
    en: string
  }
}

export const PROJECTS: IProjectItem[] = [
  {
    id: 1,
    imgPath: project1,
    title: 'Xcel.vn - EdTech Platform',
    category: 'Fullstack',
    featured: true,
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS'],
    githubLink: 'https://github.com/AnhHuynh1999',
    demoLink: 'https://xcel.vn/',
    description: {
      vi: 'Nền tảng đào tạo trực tuyến chuyên sâu về phân tích dữ liệu, tự động hóa với Excel và Google Sheets. Cung cấp hệ thống học tập video chất lượng cao, bài tập tương tác, quản lý tiến độ học viên, hệ thống Q&A trực tiếp và cấp chứng chỉ số.',
      en: 'Specialized online education platform for data analytics and spreadsheet automation. Features interactive video courses, automated quizzes, learner progress tracking, live Q&A sessions, and verifiable digital certificate generation.'
    }
  },
  {
    id: 2,
    imgPath: project2,
    title: 'Mobile App Ecosystem (React Native)',
    category: 'Mobile',
    featured: true,
    tags: ['React Native', 'TypeScript', 'Redux Toolkit', 'Rest API', 'Firebase'],
    githubLink: 'https://github.com/AnhHuynh1999',
    demoLink: 'https://github.com/AnhHuynh1999',
    description: {
      vi: 'Ứng dụng di động đa nền tảng (iOS & Android) cung cấp trải nghiệm mượt mà với tính năng thông báo thời gian thực, quản lý giỏ hàng, định vị bản đồ và thanh toán ví điện tử tích hợp an toàn.',
      en: 'Cross-platform mobile application (iOS & Android) offering fluid animations, real-time push notifications, location-based services, cart management, and seamless secure mobile payment integration.'
    }
  },
  {
    id: 3,
    imgPath: project1,
    title: 'Enterprise Management Cloud Hub',
    category: 'Fullstack',
    featured: false,
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'TailwindCSS'],
    githubLink: 'https://github.com/AnhHuynh1999',
    demoLink: 'https://github.com/AnhHuynh1999',
    description: {
      vi: 'Hệ thống quản lý nội bộ doanh nghiệp bao gồm CRM, theo dõi tiến độ công việc Kanban theo thời gian thực, phân quyền chi tiết RBAC và báo cáo thống kê trực quan hoá dạng biểu đồ tương tác.',
      en: 'Enterprise SaaS cloud solution encompassing CRM, real-time Kanban workflow board, granular RBAC permissions, and comprehensive dynamic analytical dashboards with data export.'
    }
  }
]

export const APP_DATA = {
  NAME: 'Bảo Anh IT',
  ROLE: 'Fullstack Developer',
  EMAIL: 'anhhuynh101199@gmail.com',
  PHONE: '+84 987 654 321',
  LOCATION: 'Dong Thap / Ho Chi Minh City, Vietnam',
  YOUTUBE_URL: 'https://www.youtube.com/@anhhuynh1153',
  TIKTOK_URL: 'https://www.tiktok.com/@anhhuynh101199',
  INSTAGRAM_URL: 'https://www.instagram.com/anhhuynhhhhhh/?next=%2F',
  FACEBOOK_URL: 'https://www.facebook.com/anhhuynh1011/',
  GITHUB_URL: 'https://github.com/AnhHuynh1999',
  TELEGRAM_URL: 'https://t.me/anhhuynh1999'
}
