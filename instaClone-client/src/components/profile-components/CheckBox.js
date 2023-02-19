function CheckBox ({ lable, name, checked, handleChange}) {
    return(
        <div class="form-check form-check-inline">
        <label class="form-check-label">
          {lable}
          <input
            class="form-check-input"
            type="checkbox"
            name={name}
            checked={checked}
            onChange={handleChange}
          />
        </label>
      </div>
    )
}

export default CheckBox