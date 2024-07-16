import * as yup from "yup";

export const LoginSchama = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(10).required()
});








export const RegistrationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name Required"),
  email: yup.string().email().required("email required"),
  password: yup.string().min(10).required()

})


export const PostSchema = yup.object().shape({
  title: yup.string().required("Title Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status Required"),

})

function getExtension(path) {

  if (path !== undefined) {

      var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
          // (supports `\\` and `/` separators)
          pos = basename.lastIndexOf(".");       // get last position of `.`

      if (basename === "" || pos < 1)            // if file name is empty or ...
          return "";                             //  `.` not found (-1) or comes first (0)

      return basename.slice(pos + 1);            // extract extension ignoring `.`
  } else {
      return "";
  }
}