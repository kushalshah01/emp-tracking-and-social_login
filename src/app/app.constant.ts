export class AppConstant {
    // All app global app constants goes here
    public static API_LINK = "http://localhost:3000";
    public static SYSTEM_SERVER_LINK = "http://localhost:4200/";
    public static SOCIAL_LOGIN = {
        "google": "51738638453-qlbdp6a2hsvn15tdr41088scon5p0s3r.apps.googleusercontent.com",
        "facebook": "904964766630910"
    };
    public static MESSAGES = {
        "INVALID_CREDENTIAL": "The username or password you entered is incorrect.",
        "DUPLICATE_EMAIL": "Email Address is Already Registered.",
        "USER_CREATE_SUCCESS": "User registered successfully.",
        "CHECK_EMAIL": "Email Address is not available in system.",
        "EMAIL_VERIFY": "Email verified successfully.",
        "PASSWORD_RESET_SUCCESS": "Your password has been reset successfully!",
        "ACTIVE_CONFIRM_MESSAGE": "Do you want to InActive this record?",
        "IN_ACTIVE_CONFIRM_MESSAGE": "Do you want to Active this record?",
        "CONFIRM_TITLE": "Are you sure?",
        "DELETE_MESSAGE": "You will not be able to recover this record!",
        "RECORD_UPDATE_SUCCESS": "Record has been updated successfully.",
        "DELETE_SUCCESS": "Your record has been deleted.",
        "EMPLOYEE_CREATE_SUCCESS": "Employee created successfully.",
        "PREMISE_CREATE_SUCCESS": "Premise added successfully."
    };
    public static DEFAULT_MANAGER = {
        "USER_NAME": "manager@gmail.com",
        "PASSWORD": "Manager123"
    };
    public static MAP_ZOOM_LEVEL = {
        "Premise_Map": 6,
        "Employee_Map": 5,
        "Employee_Check_In_Map": 6
    }
}  