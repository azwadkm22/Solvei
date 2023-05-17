import Swal from "sweetalert2";
import "./styles/SweetAlert.css"

export function SwalErrorAlert(title) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'swal-btn swal-btn-success',
            cancelButton: 'swal-btn swal-btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: title,
        icon: 'error',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Okay',
    })

}

export function SwalSuccessAlert(title) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'swal-btn swal-btn-success',
            cancelButton: 'swal-btn swal-btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: title,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
    })

}


export function SwalInfoAlert(title, text) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'swal-btn swal-btn-info'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: title,
        text: text,
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
    })

}


export function SwalQuestionAlert(title, onConfirm, onCancel)
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'swal-btn swal-btn-success',
            cancelButton: 'swal-btn swal-btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: title,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No!',
        reverseButtons: false,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm()
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            onCancel()
        }
    })
}