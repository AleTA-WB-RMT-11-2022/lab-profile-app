function CheckBox ({ lable, name, checked, handleChange}) {
    return(
        <div className="form-check form-check-inline">
        <label className="form-check-label">
          {lable}
          <input
            className="form-check-input"
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