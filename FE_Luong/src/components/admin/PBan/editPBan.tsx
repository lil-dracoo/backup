import { EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import { GetDetailPBan } from "../../../services/apiPBan.service";

interface EditPBanProps {
  isDark: boolean;
  setEditingDepartment: (record: any) => void;
  setOpenModal: (open: boolean) => void;
  form: any;
  record: any;
}

const EditPBan = (props: EditPBanProps) => {
  const { isDark, setEditingDepartment, setOpenModal, form, record } = props;

  const isActiveStatus = (status: any) =>
    status === true || status === 1 || status === "hoat_dong";

  const setDepartmentFormValues = (department: any) => {
    form.setFieldsValue({
      ...department,
      ngay_thanh_lap: dayjs(department.ngay_thanh_lap, "DD/MM/YYYY"),
      trang_thai: isActiveStatus(department.trang_thai),
    });
  };

  const HandleAPI = async (id_pb: string) => {
    try {
      const res = await GetDetailPBan(id_pb);
      setDepartmentFormValues({
        ...res.data.data,
        trang_thai: record.trang_thai ?? res.data.data.trang_thai,
      });
    } catch (error) {
      console.error("Error fetching department details:", error);
    }
  };

  return (
    <Tooltip title="Cập nhật">
      <Button
        type="text"
        icon={<EditOutlined />}
        style={{
          color: isDark ? "#cbd5e1" : "#475569",
        }}
        onClick={() => {
          setEditingDepartment(record);
          setDepartmentFormValues(record);
          setOpenModal(true);
          HandleAPI(record.id_pb);
        }}
      />
    </Tooltip>
  );
};

export default EditPBan;
