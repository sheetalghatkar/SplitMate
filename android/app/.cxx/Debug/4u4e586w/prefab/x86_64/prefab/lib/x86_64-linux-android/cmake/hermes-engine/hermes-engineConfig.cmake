if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/sheetalghatkar/.gradle/caches/8.12/transforms/07f94055a40d2b2efef5615e5e1b1106/transformed/hermes-android-0.78.2-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sheetalghatkar/.gradle/caches/8.12/transforms/07f94055a40d2b2efef5615e5e1b1106/transformed/hermes-android-0.78.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

