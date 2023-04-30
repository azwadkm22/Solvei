import React, { useState } from 'react'
import "./styles/SearchBar.css";

function SearchBar() {

    const [expanded, setExpanded] = useState(false);  

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    };

    
    return (

        <div className='searchbar-container'> 
            <div className='searchbar-header'>
                <div className='search-btn' onClick={() => setExpanded(!expanded)}>
                <div className='search-btn-element'> Search </div>
                <div className='search-btn-element'>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.2111 23L13.1611 14.95C12.5222 15.4611 11.7875 15.8657 10.9569 16.1639C10.1264 16.462 9.24259 16.6111 8.30556 16.6111C5.98426 16.6111 4.01989 15.807 2.41244 14.1987C0.805 12.5904 0.000851852 10.626 0 8.30556C0 5.98426 0.804148 4.01989 2.41244 2.41244C4.02074 0.805 5.98511 0.000851852 8.30556 0C10.6269 0 12.5912 0.804148 14.1987 2.41244C15.8061 4.02074 16.6103 5.98511 16.6111 8.30556C16.6111 9.24259 16.462 10.1264 16.1639 10.9569C15.8657 11.7875 15.4611 12.5222 14.95 13.1611L23 21.2111L21.2111 23ZM8.30556 14.0556C9.90278 14.0556 11.2606 13.4963 12.3791 12.3778C13.4976 11.2594 14.0564 9.90193 14.0556 8.30556C14.0556 6.70833 13.4963 5.35048 12.3778 4.232C11.2594 3.11352 9.90193 2.5547 8.30556 2.55556C6.70833 2.55556 5.35048 3.1148 4.232 4.23328C3.11352 5.35176 2.5547 6.70919 2.55556 8.30556C2.55556 9.90278 3.1148 11.2606 4.23328 12.3791C5.35176 13.4976 6.70919 14.0564 8.30556 14.0556Z" fill="#EFEFEF" />
                    </svg>
                </div>
                </div>
            </div>

                {expanded && (
                    <div className='search-form-container'> 
                        <form onSubmit={handleSubmit}>
                            <label className='search-form-element'> Course Code:
                            <input type="text" name="course-code" list="course-code-list" placeholder="e.g. CSE-1234" />
                                <datalist id="course-code-list">
                                    <option value="CSE" />
                                    <option value="EEE" />
                                    <option value="ECE" />
                                    <option value="IPE" />
                                </datalist>
                            </label>
                            <label className='search-form-element'>
                                Course Name:
                                <input type="text" name="course-name" list="course-name-list"  placeholder="e.g. Discrete Mathematics" />
                                <datalist id="course-name-list">
                                    <option value="Fundamental of Computer Science" />
                                    <option value="Electrical Circuit" />
                                    <option value="Semiconductor" />
                                    <option value="Information Technology" />
                                </datalist>
                            </label>
                           <label className='search-form-element'>
                            Batch:
                                <input type="number" name="batch" placeholder="e.g. 25" />
                           </label>
                            <label className='search-form-element'> 
                                Year and Semester:
                                <input name="year-and-semester" type="text" list="year-and-semester-options" placeholder="Type or select an option" />
                                <datalist id="year-and-semester-options">
                                    <option value="1st Year 1st Semester" />
                                    <option value="1st Year 2nd Semester" />
                                    <option value="2nd Year 1st Semester" />
                                    <option value="2nd Year 2nd Semester" />
                                    <option value="3rd Year 1st Semester" />
                                    <option value="3rd Year 2nd Semester" />
                                    <option value="4th Year 1st Semester" />
                                    <option value="4th Year 2nd Semester" />
                                </datalist>
                            </label>
                            <label className='search-form-element'>
                                Teacher:
                                <input name="teacher-name" type="text" list="available-teachers" placeholder="Type or select an option" />
                                <datalist id="available-teachers">
                                    <option value="Asif Hossain Khan" />
                                    <option value="Abu Ahmed Ferdaus" />
                                    <option value="Md. Mosaddek Hossain" />
                                    <option value="Hasnain Heickal" />
                                </datalist>
                                
                            </label>
                            <div className="radio-button-container search-form-element" >
                                <label>
                                    <input type="radio" name="course-question" value="course" />
                                    Course:
                                </label>
                                <label>
                                    <input type="radio" name="course-question" value="question" />
                                    Question:
                                </label>
                            </div>
                            <button className='submit-button' type="submit">Search</button>
                        </form>
                    </div>
                )}
            
        </div>
    )
}

export default SearchBar