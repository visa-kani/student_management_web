import React from 'react';

const DataComparison = ({ selectedRowData }) => {
    // Function to compare objects and get changed fields
    const getChangedFields = (currentData, previousData) => {
        if (!currentData || !previousData) return [];

        const changedFields = [];

        // Get all keys from both objects
        const allKeys = new Set([...Object.keys(currentData), ...Object.keys(previousData)]);

        allKeys.forEach(key => {
            const currentValue = currentData[key];
            const previousValue = previousData[key];

            // Skip keys that are only in one object (like createdAt, updatedAt)
            if (currentValue !== undefined && previousValue !== undefined) {
                // Compare values (convert to string for comparison)
                if (String(currentValue) !== String(previousValue)) {
                    changedFields.push({
                        field: key,
                        currentValue: currentValue,
                        previousValue: previousValue,
                        displayName: getDisplayName(key)
                    });
                }
            }
        });

        return changedFields;
    };

    // Function to convert field names to display names
    const getDisplayName = (fieldName) => {
        const displayNames = {
            'first_name': 'First Name',
            'last_name': 'Last Name',
            'email': 'Email',
            'phone_number': 'Phone Number',
            'date_of_birth': 'Date of Birth',
            'gender': 'Gender',
            'address': 'Address',
            'city': 'City',
            'state': 'State',
            'country': 'Country',
            'pincode': 'Pincode',
            'course': 'Course',
            'status': 'Status',
            'admission_date': 'Admission Date',
            'enrollment_number': 'Enrollment Number'
        };

        return displayNames[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace('_', ' ');
    };

    // Function to format values for display
    const formatValue = (value) => {
        if (value === null || value === undefined) return 'N/A';
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return String(value);
    };

    // Use sample data if selectedRowData is not provided
    const dataToUse = selectedRowData;
    const finalChangedFields = getChangedFields(dataToUse?.currentData, dataToUse?.previousData);

    if (finalChangedFields.length === 0) {
        return (
            <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-center">No changes detected</p>
            </div>
        );
    }

    return (
        <div className="">
            <hr className='my-5' />
            <h2 className="text-base font-semibold text-gray-800 mb-4">Updated Data</h2>
            <div className="space-y-3">
                {finalChangedFields.map((field, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className="font-medium text-base text-gray-800">
                            {field.displayName}
                        </div>
                        <div className="font-medium text-sm text-gray-500 max-w-md text-right">
                            {formatValue(field.previousValue)}
                            <span className="mx-2">{">"}</span>
                          {formatValue(field.currentValue)}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DataComparison;