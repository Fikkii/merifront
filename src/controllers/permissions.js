// permissions.js
export const rolePermissions = {
  admin: ['dashboard.view', 'course.edit', 'admin.manage'],
  instructor: ['dashboard.view', 'course.edit', 'admin.manage'],
  student: ['dashboard.view', 'student.manage']
}

export function hasPermission(role, permission) {
    //check if permission is array, then iterate. else leave as it is...
    if(Array.isArray(permission)){
        const access = permission.filter(value => rolePermissions[role]?.includes(value))
        if (access.length > 0){
            return true;
        } else return false;
    }else{
        return rolePermissions[role]?.includes(permission)
    }
}
