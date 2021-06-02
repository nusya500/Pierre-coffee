export const useCategory = (category, language) => {

    const categoryData = category.map(({ id, items, name, nameRU, nameTR, pictureURL, subCategory, subCategoryStatus }) => {
        return {
            id: id,
            items: items.map(({ id, category, description, descriptionRU, descriptionTR, discount, name, nameRU, nameTR, pictureURL, price, weight }) => {
                return {
                    id: id,
                    category: category,
                    description: language === 'RU' ? descriptionRU : language === 'TR' ? descriptionTR : language === 'EN' ? description : '',
                    discount: discount,
                    name: language === 'RU' ? nameRU : language === 'TR' ? nameTR : language === 'EN' ? name : '',
                    pictureURL: pictureURL,
                    price: price,
                    weight: weight
                }
            }),
            name: language === 'RU' ? nameRU : language === 'TR' ? nameTR : language === 'EN' ? name : '',
            pictureURL: pictureURL,
            subCategory: subCategory.map(({ id, name, nameRU, nameTR, pictureURL, subCategory, subCategoryStatus }) => {
                return {
                    id: id,
                    name: language === 'RU' ? nameRU : language === 'TR' ? nameTR : language === 'EN' ? name : '',
                    pictureURL: pictureURL,
                    subCategory: subCategory,
                    subCategoryStatus: subCategoryStatus
                }
            }),
            subCategoryStatus: subCategoryStatus
        }
    })

    

    return { categoryData }
}