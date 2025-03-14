package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.implementations.MongoDB.MongoCategoryDAO;
import edu.byu.pnt.model.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CategoryDAOTest {

    private DAOFactory factory;
    private MongoCategoryDAO dao;

    private Category testCategory;

    @BeforeEach
    void setUp() throws DataAccessException {
        // Get DAO
        factory = new FactoryProvider().getFactory();
        dao = (MongoCategoryDAO) factory.createCategoryDAO();

        // Create test Category
        final String testCategoryID = "TEST_CATEGORY_ID";
        final String testCategoryLabel = "TEST_CATEGORY_LABEL";
        testCategory = new Category(testCategoryID, testCategoryLabel);

        // Delete the testing category if it exists in the database
        dao.deleteCategory(testCategoryID);
    }

    @Test
    void addCategory() throws DataAccessException {
        // Add the category
        dao.addCategory(testCategory);

        // Retrieve the category by id
        Category retrievedCategory = dao.getCategory(testCategory.id());

        // Assert that the category was added successfully
        assertNotNull(retrievedCategory, "Category should exist after being added.");
        assertEquals(testCategory.id(), retrievedCategory.id(), "Category ID mismatch.");
        assertEquals(testCategory.label(), retrievedCategory.label(), "Category label mismatch.");
    }

    @Test
    void getCategory() throws DataAccessException {
        // Add the category
        dao.addCategory(testCategory);

        // Retrieve the category by id
        Category retrievedCategory = dao.getCategory(testCategory.id());

        // Assert the category is correctly retrieved
        assertNotNull(retrievedCategory, "Category should exist for the given ID.");
        assertEquals(testCategory.id(), retrievedCategory.id(), "Category ID mismatch.");
        assertEquals(testCategory.label(), retrievedCategory.label(), "Category label mismatch.");
    }

    @Test
    void updateCategory() throws DataAccessException {
        // Add the category
        dao.addCategory(testCategory);

        // Update the category's label
        String newLabel = "UPDATED_CATEGORY_LABEL";
        dao.updateCategory(testCategory.id(), newLabel);

        // Retrieve the updated category
        Category updatedCategory = dao.getCategory(testCategory.id());

        // Assert the category label was updated correctly
        assertNotNull(updatedCategory, "Updated category should exist.");
        assertEquals(newLabel, updatedCategory.label(), "Category label should match the updated value.");
    }

    @Test
    void deleteCategory() throws DataAccessException {
        // Add the category
        dao.addCategory(testCategory);

        // Delete the category
        dao.deleteCategory(testCategory.id());

        // Attempt to retrieve the category
        assertThrows(DataAccessException.class, () -> dao.getCategory(testCategory.id()));
    }

    @Test
    void deleteNonExistentCategory() throws DataAccessException {
        // Try deleting a non-existent category
        dao.deleteCategory(testCategory.id());

        // Attempt to retrieve the category
        assertThrows(DataAccessException.class, () -> dao.getCategory(testCategory.id()));
    }
}
