import { useFormik } from "formik";
import * as yup from "yup";
import { Grid, TextField, Button } from "@mui/material";
import { EmployeeLineItem } from "../../interfaces/employees";

interface EmployeeFormProps {
  loading: boolean;
  employee: EmployeeLineItem;
  handleSubmit: (employee: EmployeeLineItem) => Promise<void>;
}

export const EmployeeForm = ({
  loading,
  employee,
  handleSubmit,
}: EmployeeFormProps) => {
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.date().required(),
    occupation: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      occupation: employee.occupation,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleSubmit({
        ...employee,
        name: values.name,
        email: values.email,
        phone: values.phone,
        occupation: values.occupation,//
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            id="name"
            name="name"
            label="Name"
            fullWidth
            disabled={loading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name ? formik.errors.name : ""}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="email"
            name="email"//
            label="emailAddress"
            fullWidth
            disabled={loading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email ? formik.errors.email : ""}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="phone"
            fullWidth
            disabled={loading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone ? formik.errors.phone : ""}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="occupation"
            name="occupation"
            label="occupation"
            fullWidth
            disabled={loading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.occupation}
            error={
              formik.touched.occupation && Boolean(formik.errors.occupation)
            }
            helperText={
              formik.touched.occupation ? formik.errors.occupation : ""
            }
          />
        </Grid>
        <Grid item xs={6} sm={6} />
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex !important",
            justifyContent: "right !important;",
          }}
        >
          <Button type="submit" disabled={formik.isSubmitting || loading}>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
