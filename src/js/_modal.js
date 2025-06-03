import IMask from "imask";
import SlimSelect from 'slim-select';

document.addEventListener('DOMContentLoaded', () => {
  // Custom selects
  const selectList = document.querySelectorAll('select')
  const ssList = []
  if (selectList.length) {
    selectList.forEach((select) => {
      const ss = new SlimSelect({
        select: select,
        settings: {
          showSearch: false,
          placeholderText: "   ",
        },
        events: {
          beforeChange: () => {
            select.closest('.form-group').classList.add('form-group--filled')
          }
        }
      })

      ssList.push(ss)
    })
  }
  // /Custom selects

  const modalList = document.querySelectorAll('.modal')
  if (modalList.length) {
    const showModal = (name) => {
      const modal = document.querySelector(`#modal-${name}`)
      if (!modal) {
        console.error(`Модальное окно #${name} не найдено`)
        return
      }
      document.body.style.overflow = 'hidden'
      modal.style.display = 'flex'
      setTimeout(() => {
        modal.classList.add('modal--show')
      }, 50)
    }

    const closeModal = (modal) => {
      modal.classList.remove('modal--show')
      setTimeout(() => {
        document.body.style.overflow = ''
        modal.style.display = ''
      }, 300)
    }


    modalList.forEach((modal) => {
      const closeBtn = modal.querySelector('.modal__close')
      closeBtn.addEventListener('click', () => closeModal(modal))

      modal.addEventListener('click', (evt) => {
        if (!evt.target.closest('.modal__window')) {
          closeModal(modal)
        }
      })

      let isUserAgree = false
      const agreementCheck = modal.querySelector('input[name="agreement"]')
      if (agreementCheck) {
        agreementCheck.addEventListener('change', () => {
          isUserAgree = agreementCheck.checked
          agreementCheck.closest('.checkbox').classList.remove('checkbox--error')
        })
      }

      const form = modal.querySelector('.modal__form')
      if (form) {
        let phoneMask
        const inputTel = modal.querySelector('input[type="tel"]')

        const groupList = form.querySelectorAll('.form-group--required')
        if (groupList.length) {
          groupList.forEach((group) => {
            const input = group.querySelector('.form-group__input')
            input.addEventListener('input', () => {
              group.classList.remove('form-group--error')
            })
          })
        }

        if (inputTel) {
          phoneMask = IMask(
            inputTel,
            {
              mask: '+{7}(000) 000-00-00',
              placeholder: '_',
              lazy: false,
            }
          )
        }

        const formReset = () => {
          ssList.forEach((ss) => {
            const select = ss.select.select
            //select.closest('.form-group').classList.remove('form-group--filled')
            const event = new Event('change');
            setTimeout(() => {
              select.dispatchEvent(event)
            })
          })
          phoneMask.updateValue()
          form.reset()
        }

        form.addEventListener('submit', (evt) => {
          evt.preventDefault()
          /* ---валидация--- */
          let canSubmit = true
          if (groupList.length) {
            groupList.forEach((group) => {
              const input = group.querySelector('.form-group__input')
              if (input.type === 'tel') {
                if (phoneMask.unmaskedValue.length !== 11) {
                  canSubmit = false
                  group.classList.add('form-group--error')
                }
              }
              else {
                if (!input.value.trim().length) {
                  canSubmit = false
                  group.classList.add('form-group--error')
                }
              }
            })
          }
          if(!agreementCheck.checked) {
            agreementCheck.closest('.checkbox').classList.add('checkbox--error')
            canSubmit = false
          }
          /* ---валидация--- */

          if (!canSubmit) return false

          /* ---отправка--- */
          const data = new FormData(form)
          fetch("./index.html", {
            method: 'post',
            body: data,
          })
            .then((response) => {
              //response.json()
              // ----do something----
              closeModal(modal)
              showModal('success');
            })
          formReset()
        })
      }
    })

    const triggerList = document.querySelectorAll('*[data-modal]')
    if (triggerList.length) {
      triggerList.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          showModal(trigger.dataset.modal)
        })
      })
    }

    const selectList = document.querySelectorAll('.form-group__select')
    if (selectList.length) {
      selectList.forEach((btn) => {
        btn.addEventListener('click', () => {
          btn.closest('.form-group__select-box').classList.add('form-group__select-box--active')
        })
      })
    }
  }
})
