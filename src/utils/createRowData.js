

const rows = [
  {
    id: 0,
    fName: "חניך ",
    lName: "א",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "S",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך א",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 1,
    fName: "חניך ב",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "הגבעה הצרפתית",
    tShirtSize: "M",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "aaa",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 2,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "L",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ב",
    status: "לא שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 3,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "L",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ב",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 4,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "M",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ג",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 5,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "XS",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ג",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 6,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "XL",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך א",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 7,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "L",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ד",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 8,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "M",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ד",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 9,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "L",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ד",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 10,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "L",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ה",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 11,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "L",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ה",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 12,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "L",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך א",
    status: "שובץ",
    lastModified: "22.05.2019"
  },
  {
    id: 13,
    fName: "חניך ג",
    lName: "כהן",
    phone: "052-6488822",
    gender: "ז",
    neighborhood: "בית חנינא",
    tShirtSize: "L",
    city: "ירושלים",
    school: "בית ספר דוגמא",
    departmentManager: "מנהל מחלקה א",
    coordinator: "רכז א",
    tutor: "מדריך ה",
    status: "שובץ",
    lastModified: "22.05.2019"
  }
];

export default rows;



