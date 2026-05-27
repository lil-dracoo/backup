import {
  AuditOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  FieldTimeOutlined,
  FilterOutlined,
  FunctionOutlined,
  PlusOutlined,
  SearchOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";

import { useMemo, useState } from "react";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;
const { TextArea } = Input;

type SalaryStatus = "active" | "draft" | "locked";

type PositionSalary = {
  id: number;
  position: string;
  code: string;
  department: string;
  jobFamily: string;
  jobValueScore: number;
  headcount: number;
  unitPrice: number;
  p1Salary: number;
  retentionYears: number;
  increaseCycle: number;
  salarySteps: number;
  effectivePeriod: string;
  status: SalaryStatus;
};

const salaryData: PositionSalary[] = [
  {
    id: 1,
    position: "Frontend Developer",
    code: "POS-FE",
    department: "Công nghệ",
    jobFamily: "Engineering",
    jobValueScore: 4.5,
    headcount: 8,
    unitPrice: 4200000,
    p1Salary: 18900000,
    retentionYears: 10,
    increaseCycle: 1,
    salarySteps: 10,
    effectivePeriod: "2026",
    status: "active",
  },
  {
    id: 2,
    position: "Backend Developer",
    code: "POS-BE",
    department: "Công nghệ",
    jobFamily: "Engineering",
    jobValueScore: 5.2,
    headcount: 6,
    unitPrice: 4200000,
    p1Salary: 21840000,
    retentionYears: 10,
    increaseCycle: 1,
    salarySteps: 10,
    effectivePeriod: "2026",
    status: "active",
  },
  {
    id: 3,
    position: "HR Business Partner",
    code: "POS-HRBP",
    department: "Nhân sự",
    jobFamily: "Human Resources",
    jobValueScore: 4.1,
    headcount: 4,
    unitPrice: 4200000,
    p1Salary: 17220000,
    retentionYears: 8,
    increaseCycle: 1,
    salarySteps: 8,
    effectivePeriod: "2026",
    status: "draft",
  },
  {
    id: 4,
    position: "Sales Manager",
    code: "POS-SM",
    department: "Kinh doanh",
    jobFamily: "Commercial",
    jobValueScore: 7.4,
    headcount: 3,
    unitPrice: 4200000,
    p1Salary: 31080000,
    retentionYears: 10,
    increaseCycle: 1,
    salarySteps: 10,
    effectivePeriod: "2026",
    status: "active",
  },
  {
    id: 5,
    position: "Accountant",
    code: "POS-ACC",
    department: "Tài chính",
    jobFamily: "Finance",
    jobValueScore: 3.6,
    headcount: 5,
    unitPrice: 4200000,
    p1Salary: 15120000,
    retentionYears: 8,
    increaseCycle: 1,
    salarySteps: 8,
    effectivePeriod: "2026",
    status: "locked",
  },
];

const statusConfig: Record<
  SalaryStatus,
  { label: string; color: string; badge: "success" | "processing" | "default" }
> = {
  active: {
    label: "Đang áp dụng",
    color: "green",
    badge: "success",
  },
  draft: {
    label: "Bản nháp",
    color: "gold",
    badge: "processing",
  },
  locked: {
    label: "Tạm khóa",
    color: "default",
    badge: "default",
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const ThietLapLuongViTri = () => {
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>();
  const [openModal, setOpenModal] = useState(false);
  const [editingData, setEditingData] = useState<PositionSalary | null>(null);
  const [form] = Form.useForm();

  const bgColor = isDark ? "#020617" : "#f6f8fb";
  const cardColor = isDark ? "#0f172a" : "#ffffff";
  const panelColor = isDark ? "#111827" : "#f8fafc";
  const softPanelColor = isDark ? "#0b1220" : "#ffffff";
  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const subText = isDark ? "#94a3b8" : "#64748b";
  const borderColor = isDark ? "rgba(148,163,184,0.14)" : "#e2e8f0";

  const activeData = salaryData.filter((item) => item.status === "active");
  const totalP1Fund = activeData.reduce(
    (sum, item) => sum + item.p1Salary * item.headcount,
    0
  );
  const totalWeightedPoint = activeData.reduce(
    (sum, item) => sum + item.jobValueScore * item.headcount,
    0
  );
  const calculatedUnitPrice =
    totalWeightedPoint > 0 ? Math.round(totalP1Fund / totalWeightedPoint) : 0;
  const totalHeadcount = salaryData.reduce((sum, item) => sum + item.headcount, 0);

  const filteredData = useMemo(() => {
    return salaryData.filter((item) => {
      const matchSearch = [item.position, item.code, item.jobFamily]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchDepartment = department ? item.department === department : true;
      const matchTab = activeTab === "all" ? true : item.status === activeTab;

      return matchSearch && matchDepartment && matchTab;
    });
  }, [activeTab, department, search]);

  const openCreateModal = () => {
    setEditingData(null);
    form.resetFields();
    form.setFieldsValue({
      unitPrice: calculatedUnitPrice,
      retentionYears: 10,
      increaseCycle: 1,
      salarySteps: 10,
      effectivePeriod: "2026",
    });
    setOpenModal(true);
  };

  const openEditModal = (record: PositionSalary) => {
    setEditingData(record);
    form.setFieldsValue(record);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Vị trí",
      dataIndex: "position",
      fixed: "left" as const,
      width: 280,
      render: (value: string, record: PositionSalary) => (
        <Space size={14}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              background: "rgba(37,99,235,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563eb",
              fontSize: 20,
            }}
          >
            <UserOutlined />
          </div>

          <Space direction="vertical" size={1}>
            <Text style={{ color: textColor, fontWeight: 700, fontSize: 15 }}>
              {value}
            </Text>
            <Space size={6} wrap>
              <Tag color="blue" style={{ borderRadius: 999 }}>
                {record.code}
              </Tag>
              <Text style={{ color: subText, fontSize: 13 }}>{record.jobFamily}</Text>
            </Space>
          </Space>
        </Space>
      ),
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      width: 140,
      render: (value: string) => (
        <Tag color="cyan" style={{ borderRadius: 999, fontWeight: 600 }}>
          {value}
        </Tag>
      ),
    },
    {
      title: "Hệ số giá trị",
      dataIndex: "jobValueScore",
      width: 130,
      render: (value: number) => (
        <Text style={{ color: textColor, fontWeight: 800, fontSize: 16 }}>
          {value}
        </Text>
      ),
    },
    {
      title: "Điểm quy đổi",
      width: 130,
      render: (_: unknown, record: PositionSalary) => (
        <Text style={{ color: textColor, fontWeight: 700 }}>
          {(record.jobValueScore * record.headcount).toFixed(1)}
        </Text>
      ),
    },
    {
      title: "Đơn giá tiền lương",
      dataIndex: "unitPrice",
      width: 170,
      render: (value: number) => (
        <Text style={{ color: "#2563eb", fontWeight: 800 }}>
          {formatCurrency(value)}
        </Text>
      ),
    },
    {
      title: "Lương P1 cố định",
      dataIndex: "p1Salary",
      width: 170,
      render: (value: number, record: PositionSalary) => (
        <Space direction="vertical" size={2}>
          <Text style={{ color: "#10b981", fontWeight: 800 }}>
            {formatCurrency(value)}
          </Text>
          <Text style={{ color: subText, fontSize: 12 }}>
            {record.jobValueScore} x {formatCurrency(record.unitPrice)}
          </Text>
        </Space>
      ),
    },
    {
      title: "Số bậc P1",
      dataIndex: "salarySteps",
      width: 130,
      render: (value: number, record: PositionSalary) => (
        <Space direction="vertical" size={2}>
          <Tag color="purple" style={{ borderRadius: 999, fontWeight: 700 }}>
            {value} bậc
          </Tag>
          <Text style={{ color: subText, fontSize: 12 }}>
            {record.retentionYears}/{record.increaseCycle} năm
          </Text>
        </Space>
      ),
    },
    {
      title: "Mức từng bậc",
      width: 210,
      render: (_: unknown, record: PositionSalary) => (
        <Space direction="vertical" size={2}>
          <Text style={{ color: textColor, fontWeight: 700 }}>
            Bậc 1 - {record.salarySteps}: bằng nhau
          </Text>
          <Text style={{ color: subText, fontSize: 12 }}>
            {formatCurrency(record.p1Salary)} / bậc
          </Text>
        </Space>
      ),
    },
    {
      title: "Quỹ P1 vị trí",
      width: 160,
      render: (_: unknown, record: PositionSalary) => (
        <Text style={{ color: textColor, fontWeight: 700 }}>
          {formatCurrency(record.p1Salary * record.headcount)}
        </Text>
      ),
    },
    {
      title: "Hiệu lực",
      dataIndex: "effectivePeriod",
      width: 100,
      render: (value: string) => (
        <Tag color="geekblue" style={{ borderRadius: 999 }}>
          {value}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 140,
      render: (value: SalaryStatus) => (
        <Badge
          status={statusConfig[value].badge}
          text={
            <Tag color={statusConfig[value].color} style={{ borderRadius: 999 }}>
              {statusConfig[value].label}
            </Tag>
          }
        />
      ),
    },
    {
      title: "",
      fixed: "right" as const,
      width: 92,
      render: (_: unknown, record: PositionSalary) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record)}
            />
          </Tooltip>
          <Popconfirm title="Xóa thiết lập lương vị trí?">
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: cardColor,
          colorText: textColor,
          borderRadius: 16,
        },
      }}
    >
      <div style={{ minHeight: "100vh", background: bgColor, padding: 28 }}>
        <Card
          style={{
            marginBottom: 22,
            borderRadius: 26,
            background: cardColor,
            border: `1px solid ${borderColor}`,
            boxShadow: isDark
              ? "0 16px 42px rgba(0,0,0,0.25)"
              : "0 16px 42px rgba(15,23,42,0.06)",
          }}
          bodyStyle={{ padding: "28px 32px" }}
        >
          <Row justify="space-between" align="middle" gutter={[20, 20]}>
            <Col>
              <Space size={18} align="center">
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 20,
                    background: isDark ? "#111827" : "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563eb",
                    fontSize: 30,
                  }}
                >
                  <DollarOutlined />
                </div>

                <Space direction="vertical" size={2}>
                  <Title level={2} style={{ margin: 0, color: textColor }}>
                    Thiết lập lương vị trí P1 cố định
                  </Title>
                  <Text style={{ color: subText, fontSize: 15 }}>
                    Quản lý bảng hệ số giá trị công việc, đơn giá tiền lương và mức P1 bằng nhau ở từng bậc
                  </Text>
                </Space>
              </Space>
            </Col>

            <Col>
              <Space wrap>
                <Button
                  size="large"
                  icon={<AuditOutlined />}
                  style={{ height: 48, borderRadius: 14, fontWeight: 600 }}
                >
                  Lịch sử tính đơn giá
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  style={{
                    height: 48,
                    borderRadius: 14,
                    paddingInline: 22,
                    fontWeight: 700,
                  }}
                  onClick={openCreateModal}
                >
                  Thêm vị trí
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Row gutter={[18, 18]} style={{ marginBottom: 22 }}>
          <Col xs={24} md={12} xl={6}>
            <Card style={{ borderRadius: 22, border: `1px solid ${borderColor}` }}>
              <Statistic
                title="Quỹ lương P1"
                value={totalP1Fund}
                formatter={(value) => formatCurrency(Number(value))}
                valueStyle={{ color: "#10b981", fontWeight: 800 }}
              />
            </Card>
          </Col>
          <Col xs={24} md={12} xl={6}>
            <Card style={{ borderRadius: 22, border: `1px solid ${borderColor}` }}>
              <Statistic
                title="Tổng điểm quy đổi"
                value={totalWeightedPoint}
                precision={1}
                prefix={<FunctionOutlined />}
                valueStyle={{ color: "#2563eb", fontWeight: 800 }}
              />
            </Card>
          </Col>
          <Col xs={24} md={12} xl={6}>
            <Card style={{ borderRadius: 22, border: `1px solid ${borderColor}` }}>
              <Statistic
                title="Đơn giá tiền lương"
                value={calculatedUnitPrice}
                formatter={(value) => formatCurrency(Number(value))}
                valueStyle={{ color: "#7c3aed", fontWeight: 800 }}
              />
            </Card>
          </Col>
          <Col xs={24} md={12} xl={6}>
            <Card style={{ borderRadius: 22, border: `1px solid ${borderColor}` }}>
              <Statistic
                title="Tổng nhân sự"
                value={totalHeadcount}
                suffix="người"
                valueStyle={{ color: "#f59e0b", fontWeight: 800 }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            borderRadius: 26,
            background: cardColor,
            border: `1px solid ${borderColor}`,
          }}
          bodyStyle={{ padding: 24 }}
        >
          <Steps
            size="small"
            current={3}
            style={{ marginBottom: 22 }}
            items={[
              {
                title: "Hệ số",
                description: "Giá trị công việc",
                icon: <FunctionOutlined />,
              },
              {
                title: "Đơn giá",
                description: "Quỹ P1 / tổng điểm",
                icon: <CalculatorOutlined />,
              },
              {
                title: "Số bậc",
                description: "Năm gắn bó / chu kỳ",
                icon: <FieldTimeOutlined />,
              },
              {
                title: "Mức P1",
                description: "Hệ số x đơn giá",
                icon: <TableOutlined />,
              },
            ]}
          />

          <Alert
            type="info"
            showIcon
            style={{ marginBottom: 18, borderRadius: 14 }}
            message="Công thức: Đơn giá tiền lương = Quỹ lương P1 / Σ(hệ số giá trị công việc x số người). Lương P1 cố định = hệ số giá trị công việc x đơn giá tiền lương."
          />

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: "all", label: "Tất cả" },
              { key: "active", label: "Đang áp dụng" },
              { key: "draft", label: "Bản nháp" },
              { key: "locked", label: "Tạm khóa" },
            ]}
          />

          <Row
            justify="space-between"
            align="middle"
            gutter={[14, 14]}
            style={{ marginBottom: 20 }}
          >
            <Col flex="auto">
              <Space wrap size={12}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tìm vị trí, mã, nhóm nghề..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  style={{ width: 320, height: 44, borderRadius: 14 }}
                />
                <Select
                  allowClear
                  placeholder="Phòng ban"
                  value={department}
                  onChange={setDepartment}
                  style={{ width: 180, height: 44 }}
                  options={[
                    { label: "Công nghệ", value: "Công nghệ" },
                    { label: "Nhân sự", value: "Nhân sự" },
                    { label: "Kinh doanh", value: "Kinh doanh" },
                    { label: "Tài chính", value: "Tài chính" },
                  ]}
                />
                <Button icon={<FilterOutlined />} style={{ height: 44, borderRadius: 14 }}>
                  Bộ lọc
                </Button>
              </Space>
            </Col>

            <Col>
              <Tag
                color="blue"
                style={{ borderRadius: 999, padding: "6px 14px", fontWeight: 700 }}
              >
                {filteredData.length} vị trí
              </Tag>
            </Col>
          </Row>

          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 6 }}
            scroll={{ x: 1760 }}
          />
        </Card>

        <Modal
          closeIcon={false}
          open={openModal}
          onCancel={closeModal}
          footer={null}
          centered
          width={980}
          destroyOnClose
          maskClosable={false}
          zIndex={2000}
          style={{ top: 16 }}
          styles={{
            mask: {
              backdropFilter: "blur(14px)",
              background: isDark ? "rgba(2,6,23,0.76)" : "rgba(15,23,42,0.42)",
            },
            root: {
              padding: 0,
              overflow: "hidden",
              borderRadius: 28,
              background: "transparent",
              boxShadow: "0 30px 80px rgba(0,0,0,0.22)",
            },
            body: {
              padding: 0,
              overflow: "hidden",
              borderRadius: 28,
              background: "transparent",
            },
          }}
        >
          <div
            style={{
              borderRadius: 28,
              overflow: "hidden",
              background: isDark ? "#0f172a" : "#ffffff",
            }}
          >
            <div
              style={{
                position: "relative",
                background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                padding: "28px 32px",
                overflow: "hidden",
              }}
            >
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  width: 48,
                  height: 48,
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.12)",
                  border: "2px solid rgba(147,197,253,0.65)",
                  color: "#fff",
                  fontSize: 16,
                  zIndex: 3,
                }}
              />

              <Space direction="vertical" size={2}>
                <Title level={2} style={{ margin: 0, color: "#fff", fontSize: 30 }}>
                  {editingData ? "Cập nhật P1 cố định" : "Thêm thiết lập P1 cố định"}
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.82)", fontSize: 14 }}>
                  Khai báo hệ số giá trị, số người, đơn giá và số bậc lương P1
                </Text>
              </Space>
            </div>

            <div style={{ padding: 28, maxHeight: "75vh", overflowY: "auto" }}>
              <Form layout="vertical" form={form}>
                <Card
                  style={{
                    borderRadius: 24,
                    background: panelColor,
                    border: `1px solid ${borderColor}`,
                  }}
                  bodyStyle={{ padding: 24 }}
                >
                  <Space direction="vertical" size={20} style={{ width: "100%" }}>
                    <div>
                      <Title level={4} style={{ margin: 0, color: textColor }}>
                        Giá trị công việc
                      </Title>
                      <Text style={{ color: subText }}>
                        Xác định vị trí, phòng ban, hệ số giá trị công việc và số người đảm nhiệm
                      </Text>
                    </div>

                    <Row gutter={[18, 18]}>
                      <Col xs={24} md={12}>
                        <Form.Item label="Tên vị trí" name="position">
                          <Input size="large" placeholder="Ví dụ: Frontend Developer" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label="Mã vị trí" name="code">
                          <Input size="large" placeholder="Ví dụ: POS-FE" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label="Phòng ban" name="department">
                          <Select
                            size="large"
                            placeholder="Chọn phòng ban"
                            options={[
                              { label: "Công nghệ", value: "Công nghệ" },
                              { label: "Nhân sự", value: "Nhân sự" },
                              { label: "Kinh doanh", value: "Kinh doanh" },
                              { label: "Tài chính", value: "Tài chính" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label="Nhóm nghề nghiệp" name="jobFamily">
                          <Select
                            size="large"
                            placeholder="Chọn nhóm nghề"
                            options={[
                              { label: "Engineering", value: "Engineering" },
                              { label: "Human Resources", value: "Human Resources" },
                              { label: "Commercial", value: "Commercial" },
                              { label: "Finance", value: "Finance" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label="Hệ số giá trị công việc" name="jobValueScore">
                          <InputNumber
                            size="large"
                            min={0}
                            step={0.1}
                            placeholder="Ví dụ: 4.5"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label="Số lượng người làm vị trí này" name="headcount">
                          <InputNumber
                            size="large"
                            min={0}
                            placeholder="Ví dụ: 8"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Space>
                </Card>

                <Card
                  style={{
                    marginTop: 20,
                    borderRadius: 24,
                    background: panelColor,
                    border: `1px solid ${borderColor}`,
                  }}
                  bodyStyle={{ padding: 24 }}
                >
                  <Space direction="vertical" size={20} style={{ width: "100%" }}>
                    <div>
                      <Title level={4} style={{ margin: 0, color: textColor }}>
                        Đơn giá, lương P1 và số bậc
                      </Title>
                      <Text style={{ color: subText }}>
                        Số bậc = số năm công ty kỳ vọng nhân viên gắn bó / chu kỳ tăng lương
                      </Text>
                    </div>

                    <Row gutter={[18, 18]}>
                      <Col xs={24} md={8}>
                        <Form.Item label="Đơn giá tiền lương" name="unitPrice">
                          <InputNumber
                            size="large"
                            addonAfter="VND"
                            min={0}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item label="Lương P1 cố định" name="p1Salary">
                          <InputNumber
                            size="large"
                            addonAfter="VND"
                            min={0}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item label="Kỳ hiệu lực" name="effectivePeriod">
                          <Input size="large" placeholder="Ví dụ: 2026" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item label="Số năm kỳ vọng gắn bó" name="retentionYears">
                          <InputNumber
                            size="large"
                            addonAfter="năm"
                            min={0}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item label="Chu kỳ tăng lương" name="increaseCycle">
                          <InputNumber
                            size="large"
                            addonAfter="năm/lần"
                            min={0.5}
                            step={0.5}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item label="Số bậc lương P1" name="salarySteps">
                          <InputNumber
                            size="large"
                            addonAfter="bậc"
                            min={1}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Alert
                      type="success"
                      showIcon
                      style={{ borderRadius: 14 }}
                      message="Trong phương án cố định, P1 bậc 1 = P1 bậc 2 = ... = P1 bậc n = hệ số giá trị công việc x đơn giá tiền lương."
                    />
                  </Space>
                </Card>

                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                  <Col xs={24} lg={12}>
                    <Card
                      style={{
                        height: "100%",
                        borderRadius: 24,
                        background: panelColor,
                        border: `1px solid ${borderColor}`,
                      }}
                    >
                      <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <div>
                          <Title level={4} style={{ margin: 0, color: textColor }}>
                            Quy tắc áp dụng
                          </Title>
                          <Text style={{ color: subText }}>
                            Kiểm soát dữ liệu trước khi đưa vào tính lương
                          </Text>
                        </div>

                        {[
                          "Bắt buộc có hệ số giá trị công việc",
                          "Bắt buộc có số lượng người đảm nhiệm",
                          "Tự động cảnh báo khi thiếu đơn giá tiền lương",
                        ].map((item) => (
                          <div
                            key={item}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "14px 16px",
                              borderRadius: 16,
                              background: softPanelColor,
                              border: `1px solid ${borderColor}`,
                            }}
                          >
                            <Text style={{ color: textColor, fontWeight: 600 }}>{item}</Text>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </Space>
                    </Card>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Card
                      style={{
                        height: "100%",
                        borderRadius: 24,
                        background: panelColor,
                        border: `1px solid ${borderColor}`,
                      }}
                    >
                      <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <div>
                          <Title level={4} style={{ margin: 0, color: textColor }}>
                            Ghi chú
                          </Title>
                          <Text style={{ color: subText }}>
                            Ghi lại giả định khi tính hệ số, quỹ lương hoặc bậc P1
                          </Text>
                        </div>

                        <Form.Item label="Mô tả">
                          <TextArea
                            rows={7}
                            placeholder="Ví dụ: hệ số đã được hội đồng đánh giá thông qua, đơn giá áp dụng cho kỳ lương năm 2026..."
                            style={{ resize: "none", borderRadius: 16 }}
                          />
                        </Form.Item>
                      </Space>
                    </Card>
                  </Col>
                </Row>

                <Divider />

                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text style={{ color: textColor, fontWeight: 700 }}>
                        Kích hoạt thiết lập sau khi lưu
                      </Text>
                      <Text style={{ color: subText }}>
                        Khi bật, vị trí này được dùng để tính P1 trong kỳ lương đang hiệu lực
                      </Text>
                    </Space>
                  </Col>
                  <Col>
                    <Switch defaultChecked />
                  </Col>
                </Row>

                <Row justify="end" style={{ marginTop: 28 }}>
                  <Space size={12}>
                    <Button
                      size="large"
                      onClick={closeModal}
                      style={{ height: 48, borderRadius: 14, paddingInline: 24 }}
                    >
                      Hủy
                    </Button>

                    <Button
                      type="primary"
                      size="large"
                      icon={<CheckCircleOutlined />}
                      style={{
                        height: 48,
                        borderRadius: 14,
                        paddingInline: 24,
                        fontWeight: 700,
                      }}
                      onClick={() => {
                        message.success(
                          editingData
                            ? "Cập nhật thiết lập P1 thành công"
                            : "Thêm thiết lập P1 thành công"
                        );
                        closeModal();
                      }}
                    >
                      {editingData ? "Cập nhật" : "Lưu thiết lập"}
                    </Button>
                  </Space>
                </Row>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default ThietLapLuongViTri;
