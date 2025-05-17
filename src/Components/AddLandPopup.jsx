import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../services/axiosConfig';

const AddLandPopup = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: {
      address: '',
      price: '',
      room: '',
      toilet: '',
      air: '',
      water: '',
      bed: '',
      wardrobe: '',
      images: [],
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Địa chỉ là bắt buộc'),
      price: Yup.number().required('Giá là bắt buộc').min(0, 'Giá phải lớn hơn 0'),
      room: Yup.number().required('Số phòng ngủ là bắt buộc').min(0, 'Số phòng phải lớn hơn 0'),
      toilet: Yup.number().required('Số phòng tắm là bắt buộc').min(0, 'Số phòng tắm phải lớn hơn 0'),
      air: Yup.number().required('Số lượng máy lạnh là bắt buộc').min(0, 'Phải lớn hơn 0'),
      water: Yup.number().required('Số lượng bình nóng lạnh là bắt buộc').min(0, 'Phải lớn hơn 0'),
      bed: Yup.number().required('Số lượng giường là bắt buộc').min(0, 'Phải lớn hơn 0'),
      wardrobe: Yup.number().required('Số lượng tủ là bắt buộc').min(0, 'Phải lớn hơn 0'),
      images: Yup.array().min(1, 'Vui lòng chọn ít nhất 1 ảnh'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('address', values.address);
        formData.append('userId', user?.userId || '');
        formData.append('price', values.price);
        formData.append('room', values.room);
        formData.append('toilet', values.toilet);
        formData.append('air', values.air);
        formData.append('water', values.water);
        formData.append('bed', values.bed);
        formData.append('wardrobe', values.wardrobe);
        formData.append('description', values.description || '');
        formData.append('status', 'Còn trống');
        formData.append('chdv', false);
        
        if (values.images && values.images.length > 0) {
          values.images.forEach((image) => {
            formData.append('images', image);
          });
        }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await axios.post('/lands/createLand', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (response.data) {
          if (onSubmit) await onSubmit();
          onClose();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response) {
          console.error('Server error:', error.response.data);
          alert(error.response.data.message || 'Có lỗi xảy ra khi tạo nhà trọ');
        } else {
          alert('Có lỗi xảy ra khi tạo nhà trọ');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('images', files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  const removeImage = (index) => {
    const newImages = [...formik.values.images];
    const newPreviews = [...previewImages];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    formik.setFieldValue('images', newImages);
    setPreviewImages(newPreviews);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Thêm nhà trọ mới</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
            <input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p className="text-xs text-gray-500 italic mt-1">
              Ví dụ: Số 10 ngõ 302 đường Láng, phường Thịnh Quang, quận Đống Đa, Hà Nội
            </p>
            {formik.touched.address && formik.errors.address && (<p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>)}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ/tháng)</label>
              <input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formik.touched.price && formik.errors.price && (<p className="mt-1 text-sm text-red-600">{formik.errors.price}</p>)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số phòng ngủ</label>
              <input type="number" name="room" value={formik.values.room} onChange={formik.handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formik.touched.room && formik.errors.room && (<p className="mt-1 text-sm text-red-600">{formik.errors.room}</p>)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số phòng tắm</label>
              <input type="number" name="toilet" value={formik.values.toilet} onChange={formik.handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formik.touched.toilet && formik.errors.toilet && (<p className="mt-1 text-sm text-red-600">{formik.errors.toilet}</p>)}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Điều hoà</label>
              <input type="number" name="air" value={formik.values.air} onChange={formik.handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formik.touched.air && formik.errors.air && (<p className="mt-1 text-sm text-red-600">{formik.errors.air}</p>)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bình nóng lạnh</label>
              <input type="number" name="water" value={formik.values.water} onChange={formik.handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formik.touched.water && formik.errors.water && (<p className="mt-1 text-sm text-red-600">{formik.errors.water}</p>)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giường</label>
              <input type="number" name="bed" value={formik.values.bed} onChange={formik.handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formik.touched.bed && formik.errors.bed && (<p className="mt-1 text-sm text-red-600">{formik.errors.bed}</p>)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tủ</label>
              <input type="number" name="wardrobe" value={formik.values.wardrobe} onChange={formik.handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formik.touched.wardrobe && formik.errors.wardrobe && (<p className="mt-1 text-sm text-red-600">{formik.errors.wardrobe}</p>)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea name="description" value={formik.values.description} onChange={formik.handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {formik.touched.description && formik.errors.description && (<p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Tải ảnh lên</span>
                    <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
                  </label>
                  <p className="pl-1">hoặc kéo thả</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
              </div>
            </div>
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {formik.touched.images && formik.errors.images && (<p className="mt-1 text-sm text-red-600">{formik.errors.images}</p>)}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">Hủy</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">{isSubmitting ? 'Đang lưu...' : 'Thêm mới'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLandPopup; 